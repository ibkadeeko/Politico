import { Pool } from 'pg';

const pool = new Pool({
  user: 'ibukun', // this is the db user credential
  database: 'politico',
  password: 'password',
  port: 5432,
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000,
});

class offices {
  static findAll(req, res) {
    pool.query('SELECT * FROM offices ORDER BY id ASC', (err, foundOffices) => {
      // callback
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      res.status(200).send({
        status: 200,
        data: foundOffices.rows,
      });
    });
  }

  static create(req, res) {
    const text = 'INSERT INTO offices(type, name) VALUES($1, $2) RETURNING *';
    const { type, name } = req.body;
    const values = [type, name];
    pool.query(text, values, (err, newOffice) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      return res.status(201).json({
        status: 201,
        data: [newOffice.rows[0]],
      });
    });
  }

  static findById(req, res) {
    const text = 'SELECT * FROM offices WHERE id = $1';
    const id = parseInt(req.params.id, 10);
    pool.query(text, [id], (err, foundOffice) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      if (foundOffice.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: [foundOffice.rows[0]],
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The office was not found',
      });
    });
  }
}

export default offices;
