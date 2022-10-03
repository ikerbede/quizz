import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { last, shareReplay } from 'rxjs/operators';
import { QuizzService } from '../shared/quizz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nbQuestions$: Observable<number>;
  bestScore: number;

  constructor(
    private readonly router: Router,
    private readonly quizzService: QuizzService
  ) {
    this.nbQuestions$ = this.quizzService.getNbQuestions().pipe(
      last(),
      shareReplay(1)
    );
    this.bestScore = this.quizzService.getBestScore();
  }

  startQuizz(): void {
    this.router.navigate(['question', 1]);
  }
}
