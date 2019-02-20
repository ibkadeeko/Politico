const dropTables = `

DROP TABLE IF EXISTS offices cascade;
DROP TABLE IF EXISTS parties cascade;
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS candidates cascade;
DROP TABLE IF EXISTS votes cascade;

`;

export default dropTables;
