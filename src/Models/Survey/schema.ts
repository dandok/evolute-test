import { Schema, Types, model } from 'mongoose';

export enum EQuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  FREETEXT = 'free_text',
}

const SurveySchema = new Schema(
  {
    questions: [
      {
        question_type: {
          type: String,
          enum: Object.values(EQuestionType),
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        options: [
          {
            description: { type: String },
          },
        ],
      },
    ],
    participants: [{ type: Types.ObjectId, ref: 'Users' }],
    creator: { type: Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true }
);

export const SurveyModel = model('Survey', SurveySchema);
