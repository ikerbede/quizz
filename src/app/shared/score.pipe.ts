import { Pipe, PipeTransform } from '@angular/core';
import { Question, QuestionMultiple } from './question.model';

@Pipe({
  name: 'score',
  pure: true,
  standalone: true
})
export class ScorePipe implements PipeTransform {
  transform(score: number | null | undefined): string {
    return score ? `${score < 10 ? '0' : ''}${score}/10` : '00/10';
  }
}
