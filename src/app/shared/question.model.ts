import { AnswerTypeEnum } from './answer-type.enum';

interface QuestionBase {
  label: string;
  answerType: AnswerTypeEnum;
  isSuccess?: boolean;
}

export interface QuestionSingle extends QuestionBase {
  choices: readonly string[];
  answerType: AnswerTypeEnum.Input | AnswerTypeEnum.Radio;
  answer: string;
}

export interface QuestionMultiple extends QuestionBase {
  choices: readonly string[];
  answerType: AnswerTypeEnum.Checkbox;
  answers: readonly string[];
}

export type Question = QuestionSingle | QuestionMultiple;
