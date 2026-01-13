const BaseController = require('../core/base-controller');

class UserController extends BaseController {
  constructor(userService) {
    super(userService);
  }
}

module.exports = UserController;