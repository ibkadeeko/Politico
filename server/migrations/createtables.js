const createTable = `

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
  officeid INTEGER NOT NULL,
  userid INTEGER NOT NULL UNIQUE,
  partyid INTEGER NOT NULL
);

CREATE TABLE votes (
  id serial PRIMARY KEY,
  officeid INTEGER NOT NULL ,
  candidateid INTEGER NOT NULL ,
  userid INTEGER NOT NULL
);
`;

export default createTable;
