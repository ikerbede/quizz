import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { QuizzService } from '../shared/quizz.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  nbQuestions = 0;
  bestScore = 0;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly quizzService: QuizzService
  ) {}

  ngOnInit(): void {
    this.quizzService.getQuestions()
      .pipe(takeUntil(this._destroy$))
      .subscribe(questions => (this.nbQuestions = questions.length));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  startQuizz(): void {
    this.router.navigate(['question', 1]);
  }
}
