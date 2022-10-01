import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Question } from '../shared/question.model';
import { QuizzService } from '../shared/quizz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  questionIndex!: number;
  nbQuestions$: Observable<number>;
  question$: Observable<Question | undefined>;
  timer$: Observable<number>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly quizzService: QuizzService
  ) {
    const indexParam = this.route.snapshot.paramMap.get('index');
    this.questionIndex = indexParam ? Number.parseInt(indexParam) : 0;
    this.nbQuestions$ = this.quizzService.getNbQuestions();
    this.question$ = this.quizzService.getQuestion(this.questionIndex).pipe(take(1));
    this.timer$ = this.quizzService.getTimer();
  }

  validateAnswer() {
    // TODO: Compare given answer to theoretical and update state
    // TODO: Navigate to index + 1 or results if it is last index
  }

}
