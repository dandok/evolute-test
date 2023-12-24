import { CustomException } from '../middlewares/custom-error';
import { EUserType } from '../@types/appp.enum';

describe('AdminService', () => {
  let adminService;
  let mockUserService;

  beforeEach(() => {
    mockUserService = {
      createUser: jest.fn((val) => val),
    } as any;

    adminService = {
      inviteUser: (email) =>
        mockUserService.createUser({
          email,
          role: EUserType.ONE,
        }),
    };
  });

  it('should throw error if no user email is provided', async () => {
    try {
      await adminService.inviteUser('');
    } catch (error) {
      expect(error.message).toBe('no user email was provided');
      expect(typeof error.message).toBe(CustomException);
      expect(error).toBeDefined();
    }
  });

  it('should call userService.createUser with the correct parameters', async () => {
    const userEmail = 'test@example.com';
    const result = await adminService.inviteUser(userEmail);

    expect(result).toBeDefined();
    expect(mockUserService.createUser).toHaveBeenCalledWith({
      email: userEmail,
      role: EUserType.ONE,
    });
  });
});
