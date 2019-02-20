/* eslint-disable no-trailing-spaces */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

// Test values
const nameOmitted = {
  type: 'federal',
}; 

describe('OFFICES ROUTES', () => {
  describe('POST /offices', () => {
    it('should NOT create if office already exists', (done) => {
      const newOffice = {
        type: 'federal',
        name: 'president',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
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
