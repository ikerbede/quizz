import { Pipe, PipeTransform } from '@angular/core';
import { Question, QuestionSingle } from './question.model';

@Pipe({
  name: 'toSingle',
  pure: true,
  standalone: true
})
export class ToSinglePipe implements PipeTransform {
  transform(question: Question): QuestionSingle {
    return question as QuestionSingle;
  }
}
