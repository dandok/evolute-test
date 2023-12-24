import { injectable } from 'inversify';
import { TUser, UsersModel } from '../Models/Users/schema';

@injectable()
export class UserRepository {
  async createUser(payload: TUser) {
    return UsersModel.create(payload);
  }

  async findByEmail(email: string) {
    return UsersModel.findOne({ email });
  }
}
