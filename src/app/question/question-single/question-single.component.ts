import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { AnswerTypeEnum } from '../../shared/answer-type.enum';
import { QuestionSingle } from '../../shared/question.model';

@Component({
  selector: 'app-question-single',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './question-single.component.html',
  styleUrls: ['./question-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionSingleComponent {
  @Input() question!: QuestionSingle;
  @Output() result = new EventEmitter<boolean>();

  answerTypeEnum = AnswerTypeEnum;
  singleControl = new FormControl('', { nonNullable: true });

  constructor() {}

  validate(): void {
    const result = this.singleControl.value === this.question.answer;
    this.result.emit(result);
    this.singleControl.reset();
  }
}
