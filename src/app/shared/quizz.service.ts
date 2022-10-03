import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Question } from './question.model';

const GET_QUESTIONS_URL = 'https://storage.googleapis.com/netwo-public/quizz.json';

@Injectable({providedIn: 'root'})
export class QuizzService {
  private _questionsSource = new BehaviorSubject<Question[]>([]);
  private _timerSource = new BehaviorSubject<number>(0);

  constructor(private readonly httpClient: HttpClient) {}

  initQuestions(): Observable<readonly Question[]> {
    return this.httpClient.get<Question[]>(GET_QUESTIONS_URL)
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
      map(questions => questions.filter(question => question.isSuccess).length),
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

  startTimer(nbSeconds = 120) {
    return interval(1000).pipe(
      take(nbSeconds),
      tap(index => this._timerSource.next(index))
    );
  }

  getTimer(): Observable<number> {
    return this._timerSource.asObservable().pipe(shareReplay(1));
  }
}
