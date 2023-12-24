import { injectable } from 'inversify';
import { TSurvey } from '../@types/survey';
import { SurveyModel } from '../Models/Survey/schema';
import { UpdateQuery } from 'mongoose';

@injectable()
export class SurveyRepository {
  async findSurveyById(_id: string) {
    return await SurveyModel.findOne({ _id });
  }

  async updateSurvey(
    filter: { _id: string },
    surveyInput: UpdateQuery<TSurvey>
  ) {
    return await SurveyModel.updateOne(filter, surveyInput);
  }

  async createSurvey(surveyInput: TSurvey) {
    return await SurveyModel.create(surveyInput);
  }

  async findSurveys() {
    return await SurveyModel.find();
  }
}
