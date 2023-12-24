import { injectable } from 'inversify';
import { AdminModel } from '../Models/Admin/schema';

@injectable()
export class AdminRepository {
  async createAdmin(admin: { email: string }) {
    return await AdminModel.create(admin);
  }
}
