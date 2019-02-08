import db from '../models/index';

class candidates {
  static register(req, res) {
    const text = 'INSERT INTO candidates(userid, officeid, partyid) VALUES($1, $2, $3) RETURNING *';
    const { officeid, partyid } = req.body;
    const userid = parseInt(req.params.userid, 10);
    const values = [userid, officeid, partyid];

    db.query('SELECT * FROM candidates WHERE userid = $1', [userid], (error, response) => {
      if (response.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'User has already been registered as a candidate',
        });
      }
      return db.query(text, values, (err, newCandidate) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }
        res.status(201).send({
          status: 201,
          data: [newCandidate.rows[0]],
        });
      });
    });
  }

  static vote(req, res) {
    const text = 'INSERT INTO votes (officeid, userid, candidateid) VALUES ($1, $2, $3) RETURNING *';
    const { userid, officeid, candidateid } = req.body;
    const value = [officeid, userid, candidateid];
    db.query('SELECT * FROM votes WHERE officeid = $1 AND userid =$2', [officeid, userid], (err, result) => {
      if (result.rowCount >= 1) {
        return res.status(409).json({
          status: 409,
          error: 'Cannot vote twice',
        });
      }
      return db.query(text, value, (err, result) => {
        res.status(201).json({
          status: 201,
          data: result.rows,
        });
      });
    });
  }

  static result(req, res) {
    const { officeid } = req.params;
    const text = 'SELECT officeid, candidateid, COUNT(candidateid) AS result FROM votes WHERE officeid = $1 GROUP BY candidateid, officeid';
    db.query(text, [officeid], (err, result) => {
      if (result.rowCount < 1) {
        res.status(404).json({
          status: 404,
          error: 'Result not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
      }
    });
  }
}

export default candidates;
