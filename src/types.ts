const TYPES = {
  //controller
  AdminController: Symbol('AdminController'),
  // UserController: Symbol('UserController'),
  SurveyController: Symbol('SurveyController'),

  //service
  AdminService: Symbol('AdminService'),
  UsersService: Symbol('UsersService'),
  SurveyService: Symbol('SurveyService'),

  //repositories
  SurveyRepository: Symbol('SurveyRepository'),
  AdminRepository: Symbol('AdminRepository'),
  UserRepository: Symbol('UserRepository'),
  SurveyResponseRepository: Symbol('SurveyResponseRepository'),
};

export default TYPES;
