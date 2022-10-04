import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from '../shared/question.model';
import { QuizzRouteEnum } from '../shared/quizz-routes.constant';
import { QuizzService } from '../shared/quizz.service';
import { ScorePipe } from '../shared/score.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    ScorePipe
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  questions$: Observable<readonly Question[]>;
  score$: Observable<number>;
  bestScore: number;

  constructor(
    private readonly router: Router,
    private readonly quizzService: QuizzService
  ) {
    this.questions$ = this.quizzService.getQuestions();
    this.score$ = this.quizzService.saveScore();
    this.bestScore = this.quizzService.getBestScore();
  }

  goHome(): void {
    this.router.navigate([QuizzRouteEnum.Home]);
  }
}
