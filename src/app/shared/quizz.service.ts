import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Question } from './question.model';

const GET_QUESTIONS_URL = 'https://storage.googleapis.com/netwo-public/quizz.json';

@Injectable({providedIn: 'root'})
export class QuizzService {
  private questionsSource = new BehaviorSubject<Question[]>([]);

  constructor(private readonly httpClient: HttpClient) {}

  getQuestions(force = false): Observable<readonly Question[]> {
    return of(force || !this.questionsSource.getValue().length).pipe(
      switchMap(doInit => doInit ? this._retrieveQuestions() : of(void 0)),
      switchMap(() => this.questionsSource.asObservable()),
      shareReplay(1)
    );
  }

  getQuestion(index: number): Observable<Question | undefined> {
    return this.getQuestions().pipe(map(questions => questions[index]))
  }

  private _retrieveQuestions(): Observable<readonly Question[]> {
    return this.httpClient.get<Question[]>(GET_QUESTIONS_URL)
      .pipe(tap(questions => this.questionsSource.next(questions)));
  }
}
