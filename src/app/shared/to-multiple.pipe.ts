import { Pipe, PipeTransform } from '@angular/core';
import { Question, QuestionMultiple } from './question.model';

@Pipe({
  name: 'toMultiple',
  pure: true,
  standalone: true
})
export class ToMultiplePipe implements PipeTransform {
  transform(question: Question): QuestionMultiple {
    return question as QuestionMultiple;
  }
}
