import { ObjectId } from 'mongodb';
import { EQuestionType } from '../Models/Survey/schema';

export type TSurvey = {
  questions: questions[];
  participants?: ObjectId[];
  creator: string;
};

export type questions = {
  question_type: EQuestionType;
  description: string;
  options: options[];
};

type options = {
  description: string;
};
