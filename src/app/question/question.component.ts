import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AnswerTypeEnum } from '../shared/answer-type.enum';
import { Question } from '../shared/question.model';
import { QuizzService } from '../shared/quizz.service';
import { ToMultiplePipe } from '../shared/to-multiple.pipe';
import { ToSinglePipe } from '../shared/to-single.pipe';
import { QuestionMultipleComponent } from './question-multiple/question-multiple.component';
import { QuestionSingleComponent } from './question-single/question-single.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    ToMultiplePipe,
    ToSinglePipe,
    QuestionMultipleComponent,
    QuestionSingleComponent
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  questionIndex!: number;
  nbQuestions$: Observable<number>;
  question$: Observable<Question | undefined>;
  timer$: Observable<number>;
  isMultiple$: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly quizzService: QuizzService
  ) {
    const indexParam = this.route.snapshot.paramMap.get('index');
    this.questionIndex = indexParam ? Number.parseInt(indexParam) : 0;
    this.nbQuestions$ = this.quizzService.getNbQuestions();
    this.question$ = this.quizzService.getQuestion(this.questionIndex).pipe(take(1));
    this.timer$ = this.quizzService.getTimer();
    this.isMultiple$ = this.question$.pipe(map(question => question?.answerType === AnswerTypeEnum.Checkbox));
  }

  setResult(label: string, isSuccess: boolean) {
    this.quizzService.setQuestionResult(label, isSuccess);
    this.router.navigate(['questions', this.questionIndex + 1]);
  }

}
