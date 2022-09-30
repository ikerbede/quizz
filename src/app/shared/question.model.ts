import { AnswerTypeEnum } from './answer-type.enum';

interface QuestionBase {
  label: string;
  answerType: AnswerTypeEnum;
  choices: readonly string[];
}

export interface QuestionSingle extends QuestionBase {
  answerType: AnswerTypeEnum.Input | AnswerTypeEnum.Radio;
  answer: string;
}

export interface QuestionMultiple extends QuestionBase {
  answerType: AnswerTypeEnum.Select;
  answers: readonly string[];
}

export type Question = QuestionSingle | QuestionMultiple;
