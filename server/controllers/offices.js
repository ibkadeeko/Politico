import db from '../models/index';

// Create office
class offices {
  static create(req, res) {
    const text = 'INSERT INTO offices(type, name) VALUES($1, $2) RETURNING *';
    const { type, name } = req.body;
    const values = [type, name];
    db.query('SELECT * FROM offices WHERE name = $1', [name], (error, response) => {
      if (response.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'Office already exists',
        });
      }
      return db.query(text, values, (err, newOffice) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err.stack,
          });
        }
        res.status(201).send({
          status: 201,
          data: [newOffice.rows[0]],
        });
      });
    });
  }

  // READ - Get All offices
  static getAll(req, res) {
    db.query('SELECT * FROM offices ORDER BY id ASC', (err, foundOffices) => {
      // callback
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.stack,
        });
      }
      return res.status(200).send({
        status: 200,
        data: foundOffices.rows,
      });
    });
  }

  // READ - Get a particular office
  static getOne(req, res) {
    const text = 'SELECT * FROM offices WHERE id = $1';
    const id = parseInt(req.params.id, 10);
    db.query(text, [id], (err, foundOffice) => {
      if (err) {
        return res.status(400).json({
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
