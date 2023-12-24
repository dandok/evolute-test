import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { SurveyRepository } from '../Repositories/survey.repository';
import { TSurvey } from '../@types/survey';
import { EUserType } from '../@types/appp.enum';
import { HttpStatusCode } from '../@types/httpsStatusCode';
import { CustomException } from '../middlewares/custom-error';
import { TSurveyResponse, UsersService } from './users.service';
import { SurveyResponseRepository } from '../Repositories/survey_response.repository';
import { AddUserDto } from '../dto/add-user.dto';
import { ObjectId } from 'mongodb';
import { EQuestionType } from 'Models/Survey/schema';

@injectable()
export class SurveyService {
  constructor(
    @inject(TYPES.SurveyRepository)
    private readonly surveyRepo: SurveyRepository,
    @inject(TYPES.SurveyResponseRepository)
    private readonly surveyResponseRepo: SurveyResponseRepository,
    @inject(TYPES.UsersService) private readonly userService: UsersService
  ) {}

  async inviteUserToSurvey(data: AddUserDto, surveyId: string, email: string) {
    let user = await this.userService.checkExistingUser(data.email);
    const survey = await this.surveyRepo.findSurveyById(surveyId);
    const creator = await this.userService.checkExistingUser(email);

    await this.invitationChecks(creator, survey, user, data);
    await this.surveyRepo.updateSurvey(
      { _id: surveyId },
      { $addToSet: { participants: user._id } }
    );

    return;
  }

  async createSurvey(survey: TSurvey, email: string) {
    const creator = await this.userService.checkExistingUser(email);

    if (!creator)
      throw new CustomException(
        'you have to be invited by an admin to create a survey',
        HttpStatusCode.FORBIDDEN
      );

    if (creator.role === EUserType.ZERO)
      throw new CustomException(
        'your role does not allow you create a survey',
        HttpStatusCode.BAD_REQUEST
      );

    survey = { ...survey, creator: creator.id };
    return await this.surveyRepo.createSurvey(survey);
  }

  async submitResponse(
    response: TSurveyResponse[],
    email: string,
    surveyId: string
  ) {
    const user = await this.userService.checkExistingUser(email);
    const survey = await this.surveyRepo.findSurveyById(surveyId);

    await this.responseChecks(user, survey, response);
    await this.responseValidations(survey, response);

    return await this.surveyResponseRepo.createResponse(
      surveyId,
      user._id,
      response
    );
  }

  private async invitationChecks(creator, survey, user, data) {
    if (!creator)
      throw new CustomException(
        'you need to be invited by an admin to invite a user to this survey',
        HttpStatusCode.BAD_REQUEST
      );

    if (creator.role !== EUserType.ONE)
      throw new CustomException(
        'you do not have the permission for this',
        HttpStatusCode.BAD_REQUEST
      );

    if (!survey)
      throw new CustomException(
        'this survey does not exist',
        HttpStatusCode.NOT_FOUND
      );

    if ((survey.creator as ObjectId).toString() !== creator.id)
      throw new CustomException(
        'you cannot invite someone to a survey you did not create',
        HttpStatusCode.BAD_REQUEST
      );

    if (!user) {
      user = await this.userService.createUser({
        email: data.email,
        role: EUserType.ZERO,
      });
    }

    if (user.role === EUserType.ONE)
      throw new CustomException(
        'this user is not permitted to partake in surveys',
        HttpStatusCode.FORBIDDEN
      );

    if (survey.participants.includes(user.id))
      throw new CustomException(
        'user is already added to this survey',
        HttpStatusCode.BAD_REQUEST
      );
  }

  private async responseChecks(user, survey, response: TSurveyResponse[]) {
    if (!user) {
      throw new CustomException(
        'You cannot submit a response except you are invited',
        HttpStatusCode.FORBIDDEN
      );
    }

    if (user.role === EUserType.ZERO) {
      throw new CustomException(
        'You are not permitted to partake in surveys',
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (!survey) {
      throw new CustomException(
        'This survey does not exist',
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (response.length !== survey.questions.length) {
      throw new CustomException(
        'Kindly answer all questions',
        HttpStatusCode.BAD_REQUEST
      );
    }

    return;
  }

  private async responseValidations(survey, response) {
    for (let i = 0; i < survey.questions.length; i++) {
      const question = survey.questions[i];
      const res = response[i];

      if (
        question.question_type === EQuestionType.FREETEXT &&
        'selected_options' in res
      ) {
        throw new CustomException(
          'Answer with the right answer type for question ' + (i + 1),
          HttpStatusCode.BAD_REQUEST
        );
      }

      if (
        question.question_type === EQuestionType.MULTIPLE_CHOICE &&
        'users_free_text' in res
      ) {
        throw new CustomException(
          'Answer with the right answer type for question ' + (i + 1),
          HttpStatusCode.BAD_REQUEST
        );
      }

      if (
        question.question_type === EQuestionType.MULTIPLE_CHOICE &&
        res.selected_options.length === 0
      ) {
        throw new CustomException(
          'Select at least one valid option for question ' + (i + 1),
          HttpStatusCode.BAD_REQUEST
        );
      }

      if (question.question_type === EQuestionType.MULTIPLE_CHOICE) {
        const questionOptions = [];
        question.options.map((element) => {
          questionOptions.push(element._id.toString());
        });

        const result = this.checkForValidOptionIds(
          questionOptions,
          res.selected_options
        );
        if (!result)
          throw new CustomException(
            'invalid option id for selected option',
            HttpStatusCode.BAD_REQUEST
          );
      }
    }

    return;
  }

  async aggregateSurveyResponse(email?: string) {
    const user = await this.userService.checkExistingUser(email);

    if (!user && email) {
      throw new CustomException(
        'a user with this email does not exist',
        HttpStatusCode.FORBIDDEN
      );
    }

    return await this.surveyResponseRepo.aggregateSurveyResponses(user?._id);
  }

  private checkForValidOptionIds(
    array1: (string | ObjectId)[],
    array2: (string | ObjectId)[]
  ): boolean {
    return array1.some((value) => array2.includes(value));
  }
}
