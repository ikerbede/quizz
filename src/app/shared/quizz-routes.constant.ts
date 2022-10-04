import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { QuestionComponent } from '../question/question.component';
import { ResultsComponent } from '../results/results.component';
import { QuestionGuard } from './question.guard';

export enum QuizzRouteEnum {
  Home = 'home',
  Questions = 'questions',
  Results = 'results'
}

export const QUIZZ_ROUTES: Routes = [
  { path: QuizzRouteEnum.Home, component: HomeComponent },
  { path: `${QuizzRouteEnum.Questions}/:index`, component: QuestionComponent, canActivate: [QuestionGuard] },
  { path: QuizzRouteEnum.Results, component: ResultsComponent },
  { path: '',   redirectTo: `/${QuizzRouteEnum.Home}`, pathMatch: 'full' }
];
