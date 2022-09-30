import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';

export const QUIZZ_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questions/:id', component: QuestionComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];
