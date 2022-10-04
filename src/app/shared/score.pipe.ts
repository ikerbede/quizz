import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'score',
  pure: true,
  standalone: true,
})
export class ScorePipe implements PipeTransform {
  transform(score: number | null | undefined): string {
    return score
      ? `${score < environment.scoreTotal ? '0' : ''}${score}/${
          environment.scoreTotal
        }`
      : `00/${environment.scoreTotal}`;
  }
}
