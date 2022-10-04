import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Question } from './question.model';
import { QuizzRouteEnum } from './quizz-routes.constant';

@Injectable({providedIn: 'root'})
export class QuizzService {
  private _questionsSource = new BehaviorSubject<Question[]>([]);
  private _timerSource!: BehaviorSubject<number>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  initQuestions(): Observable<readonly Question[]> {
    return this.httpClient.get<Question[]>(`${environment.publicApi}/quizz.json`)
      .pipe(tap(questions => this._questionsSource.next(questions)));
  }

  getQuestions(): Observable<readonly Question[]> {
    return this._questionsSource.asObservable().pipe(shareReplay(1));
  }

  getNbQuestions(): Observable<number> {
    return this.getQuestions().pipe(map(questions => questions.length));
  }

  getQuestion(index: number): Observable<Question | undefined> {
    return this.getQuestions().pipe(map(questions => questions[index]))
  }

  setQuestionResult(label: string, isSuccess: boolean): void {
    const questions = this._questionsSource.getValue();
    const questionIndex = questions.findIndex(question => question.label === label);
    questions[questionIndex].isSuccess = isSuccess;
    this._questionsSource.next(questions);
  }

  saveScore(): Observable<number> {
    return this.getQuestions().pipe(
      map(questions => {
        const nbSuccess = questions.filter(question => question.isSuccess).length;
        return nbSuccess * environment.scoreTotal / questions.length;
      }),
      tap(score => {
        const bestScoreStr = localStorage.getItem('bestScore');
        const bestScore = bestScoreStr ? Number.parseInt(bestScoreStr) : 0;
        if (!bestScore || score > bestScore) {
          localStorage.setItem('bestScore', String(score));
        }
      })
    );
  }

  getBestScore(): number {
    const bestScoreStr = localStorage.getItem('bestScore');
    return bestScoreStr ? Number.parseInt(bestScoreStr) : 0;
  }

  startTimer(nbSeconds = 10): Observable<number> {
    this._timerSource = new BehaviorSubject<number>(nbSeconds);
    return interval(1000).pipe(
      take(nbSeconds),
      map(index => (nbSeconds - index - 1)),
      tap(count => {
        if (count === 0) {
          this.router.navigate([QuizzRouteEnum.Results]);
        }
        this._timerSource.next(count);
      })
    );
  }

  getTimer(): Observable<number> {
    return this._timerSource.asObservable().pipe(shareReplay(1));
  }
}
