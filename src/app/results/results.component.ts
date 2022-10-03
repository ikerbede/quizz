import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { last, Observable } from 'rxjs';
import { Question } from '../shared/question.model';
import { QuizzService } from '../shared/quizz.service';
import { ScorePipe } from '../shared/score.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    ScorePipe
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  questions$: Observable<readonly Question[]>;
  score$: Observable<number>;
  bestScore: number;

  constructor(private readonly quizzService: QuizzService) {
    this.questions$ = this.quizzService.getQuestions().pipe(last());
    this.score$ = this.quizzService.saveScore();
    this.bestScore = this.quizzService.getBestScore();
  }
}
