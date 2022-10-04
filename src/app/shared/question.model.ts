import { AnswerTypeEnum } from './answer-type.enum';

interface QuestionBase {
  label: string;
  answerType: AnswerTypeEnum;
  isSuccess?: boolean;
}

export interface QuestionInput extends QuestionBase {
  answerType: AnswerTypeEnum.Input;
  answer: string;
}

export interface QuestionRadio extends QuestionBase {
  choices: readonly string[];
  answerType: AnswerTypeEnum.Radio;
  answer: string;
}

export type QuestionSingle = QuestionInput | QuestionRadio;

export interface QuestionMultiple extends QuestionBase {
  choices: readonly string[];
  answerType: AnswerTypeEnum.Checkbox;
  answers: readonly string[];
}

export type Question = QuestionSingle | QuestionMultiple;
