import { Container } from 'inversify';
import TYPES from './types';
import { AdminService } from './Services/admin.service';
import { UsersService } from './Services/users.service';
import { SurveyRepository } from './Repositories/survey.repository';
import { SurveyService } from './Services/survey.service';
import { AdminController } from './Controllers/admin.controller';
// import { UserController } from './Controllers/users.controller';
import { AdminRepository } from './Repositories/admin.repository';
import { UserRepository } from './Repositories/user.repository';
import { SurveyController } from './Controllers/survey.controller';
import { SurveyResponseRepository } from './Repositories/survey_response.repository';

const container = new Container();

//controllers
container
  .bind<AdminController>(TYPES.AdminController)
  .to(AdminController)
  .inSingletonScope();

container
  .bind<SurveyController>(TYPES.SurveyController)
  .to(SurveyController)
  .inSingletonScope();

//services
container
  .bind<AdminService>(TYPES.AdminService)
  .to(AdminService)
  .inSingletonScope();
container
  .bind<UsersService>(TYPES.UsersService)
  .to(UsersService)
  .inSingletonScope();
container
  .bind<SurveyService>(TYPES.SurveyService)
  .to(SurveyService)
  .inSingletonScope();

//repositories
container
  .bind<SurveyRepository>(TYPES.SurveyRepository)
  .to(SurveyRepository)
  .inSingletonScope();
container
  .bind<SurveyResponseRepository>(TYPES.SurveyResponseRepository)
  .to(SurveyResponseRepository)
  .inSingletonScope();
container
  .bind<AdminRepository>(TYPES.AdminRepository)
  .to(AdminRepository)
  .inSingletonScope();
container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();

export default container;
