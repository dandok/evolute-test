import {
  controller,
  httpGet,
  httpPost,
  requestParam,
} from 'inversify-express-utils';
import TYPES from '../types';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { SurveyService } from '../Services/survey.service';
import { IExtendedRequest } from '../@types/app.interface';
import { AddUserDto } from '../dto/add-user.dto';
import { validationMiddleware } from '../middlewares/validation-middleware';
import { SurveyInputDto } from '../dto/survey-input.dto';
import { TSurvey } from '../@types/survey';
import { SurveyResponseDto } from '../dto/survey-response.dto';
import { TSurveyResponse } from '../Services/users.service';
import { HttpStatusCode } from '../@types/httpsStatusCode';

@controller('/survey')
export class SurveyController {
  constructor(
    @inject(TYPES.SurveyService) private readonly surveyService: SurveyService
  ) {}

  @httpPost('/invite-user/:id', validationMiddleware(AddUserDto))
  async inviteUser(
    @requestParam('id') surveyId: string,
    req: IExtendedRequest<AddUserDto>,
    res: Response
  ) {
    const data = req.validatedBody as AddUserDto;
    const creator = req.headers.email;
    await this.surveyService.inviteUserToSurvey(data, surveyId, creator);

    return {
      status: HttpStatusCode.OK,
      message: 'user invited successfully',
    };
  }

  @httpPost('', validationMiddleware(SurveyInputDto))
  async createSurvey(req: IExtendedRequest<SurveyInputDto>, res: Response) {
    const creator = req.headers.email;
    const surveyInput = req.validatedBody as unknown as TSurvey;

    const response = await this.surveyService.createSurvey(
      surveyInput,
      creator
    );

    return {
      ...response,
      status: HttpStatusCode.OK,
      message: 'survey created successfully',
    };
  }

  @httpPost('/submit/:id', validationMiddleware(SurveyResponseDto))
  async submitResponse(
    @requestParam('id') id: string,
    req: IExtendedRequest<SurveyResponseDto>,
    res: Response
  ) {
    const user = req.headers.email;
    const answer = req.validatedBody.response as TSurveyResponse[];

    const response = await this.surveyService.submitResponse(answer, user, id);

    return {
      ...response,
      status: HttpStatusCode.OK,
      message: 'response submitted successfully',
    };
  }

  @httpGet('/aggregation/:email')
  async getAggregation(@requestParam('email') email: string) {
    return await this.surveyService.aggregateSurveyResponse(email);
  }
}
