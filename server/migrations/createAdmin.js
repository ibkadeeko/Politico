import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.config();

const firstname = process.env.ADMIN_FN;
const lastname = process.env.ADMIN_LN;
const othername = process.env.ADMIN_ON;
const email = process.env.ADMIN_EMAIL;
const phone = process.env.ADMIN_PHONE;
const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8);
const isAdmin = true;

const values = [
  firstname,
  lastname,
  othername,
  email,
  phone,
  password,
  isAdmin,
];

const text = 'INSERT INTO users(firstname, lastname, othername, email, phone, password, isAdmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';

const createAdmin = () => {
  db.query(text, values, () => {
    console.log('Admin Successfully Created');
  });
};

createAdmin();
