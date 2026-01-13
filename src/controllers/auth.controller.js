const BaseController = require('../core/base-controller');
const { ValidationError, ApiError } = require('../errors/api-error');

class AuthController extends BaseController {
  constructor(authService) {
    super(authService);
    this.authService = authService;
  }

  async register(req) {
    const { username, password } = req.body;

    try {
      return await this.authService.register(username, password);
    } catch (error) {
      if (error.message === 'Username déjà pris') {
        throw new ApiError(409, error.message);
      }

      if (error.message === 'Username et password requis') {
        throw new ValidationError(error.message);
      }

      throw error;
    }
  }

  login(req) {
    return {
      message: 'Connecté',
      user: req.user.username,
    };
  }

  getProfile(req) {
    return req.user;
  }
}

module.exports = AuthController;
