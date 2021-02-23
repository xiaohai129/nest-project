import db from './db.config';
import redis from './redis.config';

export default () => ({
  db,
  redis,
  jwt: {
    secret: '123456'
  }
});
