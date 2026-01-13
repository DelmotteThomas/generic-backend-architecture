const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');

// Middlewares maison
const logger = require('./middlewares/logger.middleware');
const sanitizer = require('./middlewares/sanitizer.middleware');
const { globalLimiter } = require('./middlewares/rate-limit.middleware');

// Routes
const createRoutes = require('./routes/index.routes');

// Errors
const errorHandler = require('./errors/error-handler');
const notFound = require('./middlewares/not-found.middleware');

module.exports = (container) => {
  const app = express();

  /* ================== GLOBAL ================== */

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.static('public'));

  /* ================== SÉCURITÉ ================== */

  app.use(helmet());

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  }));

  app.use(globalLimiter);
  app.use(hpp());
  app.use(sanitizer);
  app.use(logger);

  /* ================== AUTH / SESSION ================== */

  app.use(container.sessionMiddleware);
  app.use(container.passport.initialize());
  app.use(container.passport.session());

  /* ================== ROUTES ================== */

  app.use('/', createRoutes(container));

  /* ================== ERRORS ================== */

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
