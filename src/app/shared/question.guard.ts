import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QuizzService } from './quizz.service';

export class QuestionGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly quizzService: QuizzService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const indexParam = route.paramMap.get('index');
    const questionIndex = indexParam ? Number.parseInt(indexParam) : 0;

    return this.quizzService.getNbQuestions().pipe(
      tap(nbQuestions => {
        if (questionIndex === nbQuestions) {
          this.router.navigate(['results']);
        }
      }),
      map(nbQuestions => questionIndex > 0 && questionIndex <  nbQuestions)
    );
  }
}
