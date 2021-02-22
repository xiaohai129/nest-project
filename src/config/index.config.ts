import * as db from './db.config';
import * as redis from './redis.config';

export default () => ({
  db,
  redis
});
