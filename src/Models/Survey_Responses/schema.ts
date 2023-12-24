import { Schema, Types, model } from 'mongoose';

const SurveyResponseSchema = new Schema(
  {
    surveyId: { type: Types.ObjectId, ref: 'Survey._id' },
    userId: { type: Types.ObjectId, ref: 'Users._id' },
    response: [
      {
        question_id: {
          type: Types.ObjectId,
          ref: 'Survey.questions._id',
        },
        users_free_text: {
          type: String,
          required: false,
        },
        selected_options: [
          {
            type: Types.ObjectId,
            ref: 'Survey.questions.options',
            required: false,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
export const SurveyResponseModel = model(
  'SurveyResponse',
  SurveyResponseSchema
);
