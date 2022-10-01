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
