const { NotFoundError } = require('../errors/api-error');

const notFoundMiddleware = (req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
};

module.exports = notFoundMiddleware;
