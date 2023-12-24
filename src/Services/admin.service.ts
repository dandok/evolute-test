import { inject, injectable } from 'inversify';
import { CustomException } from '../middlewares/custom-error';
import { HttpStatusCode } from '../@types/httpsStatusCode';
import TYPES from '../types';
import { UsersService } from './users.service';
import { EUserType } from '../@types/appp.enum';

@injectable()
export class AdminService {
  constructor(
    @inject(TYPES.UsersService) private readonly userService: UsersService
  ) {}

  async inviteUser(email: string) {
    if (!email)
      throw new CustomException(
        'no user email was provided',
        HttpStatusCode.BAD_REQUEST
      );

    const response = await this.userService.createUser({
      email,
      role: EUserType.ONE,
    });

    return {
      ...response,
      status: HttpStatusCode.OK,
      message: 'user invited successfully',
    };
  }
}
