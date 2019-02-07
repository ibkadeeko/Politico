import db from '../models/index';
import createTable from './createtables';

const createDatabaseTables = () => {
  db.query(createTable, () => {
    console.log('Tables created successfully');
  });
};

createDatabaseTables();
