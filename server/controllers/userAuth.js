import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.config();

class users {
  static register(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const isadmin = false;
    const {
      firstname, lastname, othername, email, phone, passporturl,
    } = req.body;
    const values = [
      firstname,
      lastname,
      othername,
      email,
      phone,
      hashedPassword,
      passporturl,
      isadmin,
    ];
    const text = 'INSERT INTO users(firstname, lastname, othername, email, phone, password, passporturl, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    db.query('SELECT * FROM users WHERE email = $1 AND phone = $2', [email, phone], (error, response) => {
      if (response.rowCount !== 0) {
        return res.status(400).json({
          status: 400,
          error: 'User already exists',
        });
      }
      return db.query(text, values, (err, newUser) => {
        if (err) {
          return res.status(500).send({
            status: 500,
            error: 'Internal response error',
          });
        }
        // create a token
        const token = jwt.sign({ id: newUser.rows[0].id, email: newUser.rows[0].email }, process.env.SECRETkey, {
          expiresIn: 86400, // expires in 24 hours
        });
        // To stop password from being returned
        delete newUser.rows[0].password;
        res.status(200).send({
          status: 200,
          data: [{ token, user: newUser.rows[0] }],
        });
      });
    });
  }
}

export default users;
