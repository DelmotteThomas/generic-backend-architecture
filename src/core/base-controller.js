const asyncHandler = require('../utils/async-handler');

class BaseController {
  /**
   * @param {BaseService} service - Instance du service associé
   */
  constructor(service) {
    this.service = service;
  }

  handleRequest(method) {
    return asyncHandler(this[method].bind(this));
  }

  // ===== CRUD STANDARD =====

  async findAll(req) {
    return this.service.findAll(req.query);
  }

  async findOne(req) {
    return this.service.findOne(req.query);
  }

  async findById(req) {
    return this.service.findById(req.params.id);
  }

  async create(req) {
    return this.service.create(req.body);
  }

  async update(req) {
    return this.service.update(req.params.id, req.body);
  }

  async delete(req) {
    return this.service.delete(req.params.id);
  }
}

module.exports = BaseController;
