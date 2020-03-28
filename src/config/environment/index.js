const path = require('path');
const dotenv = require('dotenv');
const _ = require('lodash');

const root = path.normalize(`${__dirname}/../../..`);

const env = !process.env.DB_URL ? dotenv.config({}).parsed: {};

const all = {
  env: process.env.NODE_ENV,
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  ip: process.env.IP || '0.0.0.0',
  DB_URL: 'mongodb://anish:anishpass@localhost:27017/movies' || process.env.DB_URL,
  DOMAIN: process.env.DOMAIN,
  root,
  JWT_KEY: 'lkajkdfjlkasj fkljlkadsjlk',
  SALT: 'sdljlskdjfklsdlkflklklk'
};

module.exports = _.merge(
  all,
  env,
);