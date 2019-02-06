CREATE TABLE parties (
  id serial PRIMARY key,
  name VARCHAR(128) NOT NULL UNIQUE,
  hqadrress VARCHAR NOT NULL,
  logourl VARCHAR NOT NULL
);
CREATE TABLE offices (
  id serial PRIMARY key,
  type VARCHAR(128) NOT NULL,
  name VARCHAR(128) NOT NUll UNIQUE 
);