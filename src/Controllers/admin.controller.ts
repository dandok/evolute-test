import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../types';
import { AdminService } from '../Services/admin.service';
import { Request, Response } from 'express';
import { IExtendedRequest } from '../@types/app.interface';
import { AddUserDto } from '../dto/add-user.dto';
import { validationMiddleware } from '../middlewares/validation-middleware';
import { HttpStatusCode } from '../@types/httpsStatusCode';
import { validateAdmin } from '../middlewares/admin-middleware';

@controller('/admin')
export class AdminController {
  constructor(
    @inject(TYPES.AdminService) private readonly adminService: AdminService
  ) {}

  @httpPost('/add-user', validateAdmin, validationMiddleware(AddUserDto))
  async addUser(req: IExtendedRequest<AddUserDto>, res: Response) {
    const data = req.validatedBody!;
    const response = await this.adminService.inviteUser(data.email);

    return {
      ...response,
      status: HttpStatusCode.OK,
      message: 'user added successfully',
    };
  }
}
