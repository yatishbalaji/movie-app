const { name, version } = require('../package.json');
const { NODE_ENV } = require('./config/environment');
const logger = require('./components/logger');
const authenticate = require('./components/authenticate');

module.exports = (app) => {
  // Insert routes below
  app.get('/health', (req, res) => {
    return res.json({ name, version });
  });

  app.use('/api/movies', require('./api/movie'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/genre', require('./api/genre'));

  // All undefined asset or api routes should return a 404
  // eslint-disable-next-line no-unused-vars
  app.use((e, req, res, next) => {
    logger.error(e);
    return (res.status(e.statusCode || e.code || 500)
      .json({
        message: e.message,
        stack: NODE_ENV === 'development' ? e.stack : {},
      }));
  });

  // All undefined asset or api routes should return a 404
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  
  app.route('/*')
    .get((req, res) => res.sendStatus(404));
};
