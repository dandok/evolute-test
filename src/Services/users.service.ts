import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { SurveyService } from './survey.service';
import { TSurvey } from '../@types/survey';
import { UserRepository } from '../Repositories/user.repository';
import { EUserType } from '../@types/appp.enum';
import { CustomException } from '../middlewares/custom-error';
import { HttpStatusCode } from '../@types/httpsStatusCode';
import { ObjectId } from 'mongodb';

export type TSurveyResponse = {
  response: string;
  question_id: string;
  users_free_text?: string;
  selected_options?: ObjectId[];
};

@injectable()
export class UsersService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepo: UserRepository
  ) {}

  async createUser({ email, role }: { email: string; role?: EUserType }) {
    const user = await this.checkExistingUser(email);
    if (user)
      throw new CustomException(
        'user has been previously invited',
        HttpStatusCode.FORBIDDEN
      );

    return await this.userRepo.createUser({
      email,
      role: role ?? EUserType.ONE,
    });
  }

  async checkExistingUser(email: string) {
    return await this.userRepo.findByEmail(email);
  }
}
