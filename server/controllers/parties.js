import db from '../models';

class parties {
  // Create Party
  static create(req, res) {
    const text = 'INSERT INTO parties(name, hqaddress, logourl) VALUES($1, $2, $3) RETURNING *';
    const { name, hqaddress, logourl } = req.body;
    const values = [name, hqaddress, logourl];
    db.query('SELECT * FROM parties WHERE name = $1', [name], (error, response) => {
      if (response.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'party already exists',
        });
      }
      return db.query(text, values, (err, newParty) => {
        if (err) {
          res.status(400).send({
            status: 400,
            error: err.stack,
          });
        }
        res.status(201).send({
          status: 201,
          data: [newParty.rows[0]],
        });
      });
    });
  }

  // READ - Get All Parties
  static getAll(req, res) {
    db.query('SELECT * FROM parties ORDER BY id ASC', (err, foundParties) => {
      // callback
      if (err) {
        res.status(400).json({
          status: 400,
          error: err.stack,
        });
      }
      return res.status(200).send({
        status: 200,
        data: foundParties.rows,
      });
    });
  }

  // READ - Get a particular party
  static getOne(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';
    const id = parseInt(req.params.id, 10);
    db.query(text, [id], (err, foundParty) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err.stack,
        });
      }
      if (foundParty.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: [foundParty.rows[0]],
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The office was not found',
      });
    });
  }

  // PUT - Update Party
  static update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    db.query('UPDATE parties SET name = $1 WHERE id = $2 RETURNING *', [name, id], (err, updatedParty) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      if (updatedParty.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: [updatedParty.rows[0]],
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The party was not found',
      });
    });
  }

  // DELETE - Delete Party
  static delete(req, res) {
    const id = parseInt(req.params.id, 10);
    db.query('DELETE FROM parties WHERE id = $1 RETURNING *', [id], (err, response) => {
      if (err) {
        res.status(400).send({
          status: 400,
          error: err.stack,
        });
      }
      if (response.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: [{ message: `User Successfully deleted with ID: ${id}` }],
        });
      }
      return res.status(404).send({
        status: '404',
        error: 'The party was not found',
      });
    });
  }
}

export default parties;
