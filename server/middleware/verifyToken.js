import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class tokenValidator {
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        auth: false,
        message: 'No token provided.',
      });
    }
    jwt.verify(token, process.env.SECRETkey, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      }
      // if everything good, save to request for use in other routes
      req.userid = decoded.id;
      next();
    });
  }

  static verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        auth: false,
        message: 'No token provided.',
      });
    }
    jwt.verify(token, process.env.SECRETkey, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      }
      if (decoded.isadmin === false) {
        return res.status(403).send({
          auth: true,
          isAdmin: false,
          message: 'You do not have authorisation to access this page',
        });
      }
      // if everything good, save to request for use in other routes
      req.userid = decoded.id;
      next();
    });
  }
}

export default tokenValidator;
