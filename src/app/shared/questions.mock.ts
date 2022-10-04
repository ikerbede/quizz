import { AnswerTypeEnum } from './answer-type.enum';
import { Question } from './question.model';

export const QUESTIONS_MOCK: readonly Question[] = [
  {
    label: "Quel fleuve traverse l'Égypte ?",
    answerType: AnswerTypeEnum.Radio,
    choices: ['Le Kibo', 'Le Danube', 'Le Nil'],
    answer: 'Le Nil',
  },
  {
    label: 'Quel était le prénom du peintre Van Gogh. ?',
    answerType: AnswerTypeEnum.Radio,
    choices: ['Vincent', 'Claude', 'Paul', 'Christian'],
    answer: 'Vincent',
  },
  {
    label: 'Quelle est la capitale de la France ?',
    answerType: AnswerTypeEnum.Input,
    answer: 'Paris',
  },
  {
    label: 'Quelle est la capitale du Brésil ?',
    answerType: AnswerTypeEnum.Input,
    answer: 'Brasilia',
  },
  {
    label:
      'Lequel de ces français a remporté le tournoi de tennis Roland-Garros ?',
    answerType: AnswerTypeEnum.Checkbox,
    choices: [
      'Mary Pierce',
      'Jo Wilfried Tsonga',
      'Amélie Mauresmo',
      'Yannick Noah',
    ],
    answers: ['Yannick Noah', 'Mary Pierce'],
  },
];
