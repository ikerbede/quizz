import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from '../shared/question.model';
import { QuizzService } from '../shared/quizz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question$!: Observable<Question | undefined>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly quizzService: QuizzService
  ) {}

  ngOnInit(): void {
    const questionIndex = this.route.snapshot.paramMap.get('index');
    this.question$ = this.quizzService.getQuestion(questionIndex ? Number.parseInt(questionIndex) : 0);
  }

  validateAnswer() {
    // TODO: Compare given answer to theoretical and update state
    // TODO: Navigate to index + 1 or results if it is last index
  }

}
