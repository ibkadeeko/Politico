const createTable = `

DROP TABLE IF EXISTS offices cascade;
DROP TABLE IF EXISTS parties cascade;
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS candidates cascade;

CREATE TABLE parties (
  id serial PRIMARY key,
  name VARCHAR(128) NOT NULL UNIQUE,
  hqaddress VARCHAR NOT NULL,
  logourl VARCHAR NOT NULL
);

CREATE TABLE offices (
  id serial PRIMARY key,
  type VARCHAR(128) NOT NULL,
  name VARCHAR(128) NOT NUll UNIQUE
);

CREATE TABLE users (
  userid serial PRIMARY KEY,
  firstname VARCHAR(128) NOT NULL,
  lastname VARCHAR(128) NOT NULL,
  othername VARCHAR(128),
  email VARCHAR(128) NOT NULL UNIQUE,
  phone VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  passporturl TEXT,
  isadmin Boolean DEFAULT false
);

CREATE TABLE candidates (
  candidateid serial PRIMARY KEY,
  officeid INTEGER REFERENCES offices(id),
  userid INTEGER REFERENCES users(userid) UNIQUE,
  partyid INTEGER REFERENCES parties(id),
  isapproved boolean DEFAULT false
);
`;

export default createTable;