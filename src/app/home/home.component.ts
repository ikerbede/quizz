import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { QuizzService } from '../shared/quizz.service';
import { ScorePipe } from '../shared/score.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ScorePipe
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
    this.nbQuestions$ = this.quizzService.initQuestions().pipe(
      switchMap(() => this.quizzService.getNbQuestions()),
      shareReplay(1)
    );
    this.bestScore = this.quizzService.getBestScore();
  }

  startQuizz(): void {
    this.quizzService.startTimer().subscribe();
    this.router.navigate(['questions', 1]);
  }
}
