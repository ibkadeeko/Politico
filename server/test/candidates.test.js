import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const loginDetails = {
  email: 'tomblack@mandela.com',
  password: 'Ilove0dogs#',
};

const voteCandidate = {
  candidateid: 1,
  officeid: 1,
};

let token;

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
        token = res.body.data[0].token;
        done(err);
      });
  });
});

describe('ELECTIONS', () => {
  const newCandidate = {
    officeid: 1,
    partyid: 1,
  };
  const partyOmitted = {
    officeid: 1,
  };
  const officeOmitted = {
    partyid: 1,
  };
  describe('POST /office/register', () => {
    it('SHOULD NOT create new Candidate if office id is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/office/register')
        .send(officeOmitted)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('SHOULD NOT CREATE a new Candidate if party id is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/office/register')
        .send(partyOmitted)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done(err);
        });
    });
    // FOR TOKEN VALIDATION
    describe('TOKEN VALIDATION', () => {
      it('SHOULD NOT CREATE if no token is provided', (done) => {
        chai.request(app)
          .post('/api/v1/office/register')
          .send(newCandidate)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('auth').eql(false);
            done(err);
          });
      });
      it('SHOULD NOT CREATE if token is expired', (done) => {
        chai.request(app)
          .post('/api/v1/office/register')
          .send(newCandidate)
          .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsImVtYWlsIjoibWlrZXl5eUBob3RtYWlsLmNvbSIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1NTA1NzQ2ODUsImV4cCI6MTU1MDU5NjI4NX0.XwuyX1RJjN0oWcFzxGfmkTPWiwUOfl8QM2SIkC3c33g')
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('auth').eql(false);
            done(err);
          });
      });
    });
    it('SHOULD CREATE a new Candidate', (done) => {
      chai.request(app)
        .post('/api/v1/office/register')
        .send(newCandidate)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          done(err);
        });
    });
    it('SHOULD NOT create a new Candidate if candidate is already registered', (done) => {
      chai.request(app)
        .post('/api/v1/office/register')
        .send(newCandidate)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done(err);
        });
    });
  });

  describe('POST /vote', () => {
    it('User SHOULD NOT be able to vote of input is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/vote')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('User SHOULD be able to vote', (done) => {
      chai.request(app)
        .post('/api/v1/vote')
        .send(voteCandidate)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          done(err);
        });
    });
    it('User SHOULD NOT be able to vote twice', (done) => {
      chai.request(app)
        .post('/api/v1/vote')
        .send(voteCandidate)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('status').eql(409);
          done(err);
        });
    });
  });

  describe('POST /office/<office-id>/result', () => {
    it('SHOULD NOT display results if office id is Omitted', (done) => {
      let officeid;
      chai.request(app)
        .post(`/api/v1/office/${officeid}/result`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('SHOULD NOT display results if office id is not found', (done) => {
      const officeid = 99999;
      chai.request(app)
        .post(`/api/v1/office/${officeid}/result`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          done(err);
        });
    });
    it('SHOULD display results', (done) => {
      const officeid = 1;
      chai.request(app)
        .post(`/api/v1/office/${officeid}/result`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          done(err);
        });
    });
  });
});
