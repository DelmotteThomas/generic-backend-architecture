const AuthService = require('../services/auth.service');
const {ValidationError,ApiError} = require('../errors/api-error');

describe('AuthService', () => {
  let authService;
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn(),
      create: jest.fn(),
    };

    authService = new AuthService(mockUserRepository);
  });

  describe('register()', () => {
    it('throws ValidationError if username or password is missing', async () => {
      await expect(
        authService.register(null, null)
      ).rejects.toBeInstanceOf(ValidationError);
    });

    it('throws ApiError if username already exists', async () => {
      
      mockUserRepository.findByUsername.mockResolvedValue({ id: 1 });

      await expect(
        authService.register('john', 'password')
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('creates a user when data is valid', async () => {
      // mockResolved value retour
      mockUserRepository.findByUsername.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue({
        id: 1,
        username: 'john',
      });

      const result = await authService.register('john', 'password');

      expect(result).toEqual({
        id: 1,
        username: 'john',
      });
    });
  });

  describe('validateUser()', () => {
    it('returns null if user does not exist', async () => {
      mockUserRepository.findByUsername.mockResolvedValue(null);

      const result = await authService.validateUser('john', 'password');

      expect(result).toBeNull();
    });

    it('returns null if password is invalid', async () => {
      mockUserRepository.findByUsername.mockResolvedValue({
        password: 'hashed',
      });

      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(false);

      const result = await authService.validateUser('john', 'password');

      expect(result).toBeNull();
    });
  });
});
