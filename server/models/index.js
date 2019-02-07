import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

class db {
  static query(text, params, callback) {
    return pool.query(text, params, callback);
  }
}

export default db;
