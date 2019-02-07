import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.config();

class users {
  static register(req, res) {
    // Deconstruct incoming parsed elements
    const {
      firstname, lastname, othername, email, phone, password, passporturl,
    } = req.body;
    // hash password and store in hashedPassword
    const hashedPassword = bcrypt.hashSync(password, 8);
    const isadmin = false;
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
    // Check if user already exists
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
        const payload = {
          userid: newUser.rows[0].userid,
          email: newUser.rows[0].email,
          isadmin: newUser.rows[0].isadmin,
        };
        // create a token
        const token = jwt.sign(payload, process.env.SECRETkey, { expiresIn: 86400 });
        // To stop password from being returned
        delete newUser.rows[0].password;
        res.status(200).send({
          status: 200,
          data: [{ token, user: newUser.rows[0] }],
        });
      });
    });
  }

  // static me(req, res) {
  //   const token = req.headers['x-access-token'];
  //   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  //   jwt.verify(token, process.env.SECRETkey, (err, decoded) => {
  //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //     res.status(200).send(decoded);
  //   });
  // }

  static login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const { email } = req.body;
    db.query(text, [email], (err, foundUser) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: 'Database unreachable',
        });
      }
      // if user was found
      if (foundUser.rowCount !== 0) {
        const user = foundUser.rows[0];
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, error: 'Wrong Password' });
        // create a token
        const payload = {
          userid: user.userid,
          email: user.email,
          isadmin: user.isadmin,
        };
        const token = jwt.sign(payload, process.env.SECRETkey, { expiresIn: 86400 });
        // To stop password from being returned
        delete user.password;
        return res.status(200).send({
          status: 200,
          data: [{ token, user }],
        });
      }
      return res.status(404).send({
        status: 404,
        error: 'The User was not found',
      });
    });
  }
}

export default users;
