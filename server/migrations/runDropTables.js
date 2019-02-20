import db from '../models/index';
import dropTables from './dropTables';

const dropDatabase = () => {
  db.query(dropTables, () => {
    console.log('Tables successfully removed from Database');
  });
};

dropDatabase();
