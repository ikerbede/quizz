import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { QuestionComponent } from '../question/question.component';
import { ResultsComponent } from '../results/results.component';
import { QuestionGuard } from './question.guard';

export const QUIZZ_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questions/:index', component: QuestionComponent, canActivate: [QuestionGuard] },
  { path: 'results', component: ResultsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];
