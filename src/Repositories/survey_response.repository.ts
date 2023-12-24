import { injectable } from 'inversify';
import { TSurveyResponse } from '../Services/users.service';
import { SurveyResponseModel } from '../Models/Survey_Responses/schema';

@injectable()
export class SurveyResponseRepository {
  async createResponse(
    surveyId: string,
    userId: string,
    response: TSurveyResponse[]
  ) {
    return await SurveyResponseModel.create({ surveyId, userId, response });
  }

  async aggregateSurveyResponses(userId?: string) {
    const pipeline = [
      {
        $match: { userId },
      },
      {
        $group: {
          _id: '$surveyId',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'surveys',
          localField: '_id',
          foreignField: '_id',
          as: 'survey',
        },
      },
      {
        $unwind: '$survey',
      },
      {
        $project: {
          _id: 1,
          surveyTitle: '$survey.title',
          responseCount: '$count',
        },
      },
    ];

    return await SurveyResponseModel.aggregate(pipeline);
  }
}
