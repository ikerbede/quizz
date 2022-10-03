import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionMultiple } from 'src/app/shared/question.model';

interface MultipleOption {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-question-multiple',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './question-multiple.component.html',
  styleUrls: ['./question-multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionMultipleComponent implements OnInit {
  @Input() question!: QuestionMultiple;
  @Output() result = new EventEmitter<boolean>();

  multipleOptions: MultipleOption[] = [];

  constructor() {}

  ngOnInit(): void {
    this.multipleOptions = this.question.choices.map(choice => ({label: choice, selected: false}));
  }

  validate(): void {
    const selectedOptions = this.multipleOptions.filter(option => option.selected);
    const answers = this.question.answers;
    const result = selectedOptions.length === answers.length
      && selectedOptions.every(option => answers.includes(option.label));
    this.result.emit(result);
  }

}
