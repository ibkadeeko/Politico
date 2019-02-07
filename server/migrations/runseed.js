import db from '../models/index';
import seed from './seed';

const populateTables = () => {
  db.query(seed, () => {
    console.log('Tables successfully populated');
  });
};

populateTables();
