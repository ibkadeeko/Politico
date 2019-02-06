import { Pool } from 'pg';

const pool = new Pool({
  user: 'ibukun',
  database: 'politico',
  password: 'password',
  port: 5432,
  max: 40, // max number of connection can be open to database
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

class db {
  static query(text, params, callback) {
    return pool.query(text, params, callback);
  }
}

export default db;
