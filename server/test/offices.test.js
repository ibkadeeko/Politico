/* eslint-disable no-trailing-spaces */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';
import dotenv from 'dotenv';

import app from '../app';

dotenv.config();
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

// Test values
const nameOmitted = {
  type: 'federal',
}; 

const adminDetails = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const loginDetails = {
  email: 'tomblack@mandela.com',
  password: 'Ilove0dogs#',
};

let token;
let userToken;

describe('Admin', () => {
  it('SHOULD LOGIN admin on POST auth/login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(adminDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data[0].should.have.property('token');
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  });
});

describe('Users', () => {
  it('SHOULD LOGIN an existing user on POST auth/login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data[0].should.have.property('token');
        // eslint-disable-next-line prefer-destructuring
        userToken = res.body.data[0].token;
        done(err);
      });
  });
});

describe('OFFICES ROUTES', () => {
  describe('POST /offices', () => {
    it('should NOT create if no token is provided', (done) => {
      const newOffice = {
        type: 'federal',
        name: 'president',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('auth').eql(false);
          done(err);
        });
    });
    it('should NOT create if User tries to create', (done) => {
      const newOffice = {
        type: 'federal',
        name: 'president',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('auth').eql(true);
          res.body.should.have.property('isAdmin').eql(false);
          done(err);
        });
    });
    it('should NOT create if invalid admin token is provided', (done) => {
      const newOffice = {
        type: 'federal',
        name: 'president',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .set('authorization', 'Bearer someinvalidtokenlikethat')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('auth').eql(false);
          done(err);
        });
    });
    it('should NOT create if office already exists', (done) => {
      const newOffice = {
        type: 'federal',
        name: 'president',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          done(err);
        });
    });
    it('should NOT create office if NAME field is OMITTED', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .send(nameOmitted)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.eql('office Name is required');
          done(err);
        });
    });
    it('should CREATE a SINGLE office', (done) => {
      const newOffice = {
        type: 'state',
        name: 'governor of kogi',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done(err);
        });
    });
  });

  describe('GET /offices', () => {
    it('should LIST ALL offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.not.have.status(404);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('type');
          done(err);
        });
    });
  });

  describe('GET /offices/<id>', () => {
    it('should NOT list an office if id is not found', (done) => {
      const id = 99999;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('should NOT list an office if input is invalid', (done) => {
      const id = '1xae4rg2';
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('should LIST a SINGLE office', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.not.have.status(404);
          res.body.data.should.be.a('array');
          res.body.data.should.not.be.a('object');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('type');
          res.body.data[0].id.should.equal(id);
          res.body.should.not.have.property('error');
          done(err);
        });
    });
  });
});
