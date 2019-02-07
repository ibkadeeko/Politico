import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('POST auth/signup', () => {
  it('SHOULD NOT register the user if user already exists', (done) => {
    const newUser = {
      firstname: 'michael',
      lastname: 'wagner',
      othername: 'arrow',
      email: 'mikewagner@andela.com',
      phone: 18007593000,
      password: 'Ilove0cats#',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD register the user if user doesn\'t exist', (done) => {
    const newUser = {
      firstname: 'Tom',
      lastname: 'huddlestone',
      othername: 'black',
      email: 'tomblack@mandela.com',
      phone: 19002000800,
      password: 'Ilove0dogs#',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('token');
        done(err);
      });
  });
  it('SHOULD not register the user if there are conflicting unique parameters', (done) => {
    const newUser = {
      firstname: 'Nigel',
      lastname: 'henderson',
      othername: 'miller',
      email: 'nigelhenderson@great.com',
      phone: 18007593000,
      password: 'Ilovelove#',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property('status').eql(500);
        done(err);
      });
  });
});
describe('POST auth/login', () => {
  it('SHOULD NOT login the user if user is not found', (done) => {
    const loginDetails = {
      email: 'aaronkramer@hotmail.com',
      password: 'Ilove0cats#',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(404);
        done(err);
      });
  });
  it('SHOULD login the user if user is found', (done) => {
    const loginDetails = {
      email: 'tomblack@mandela.com',
      password: 'Ilove0dogs#',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('token');
        done(err);
      });
  });
  it('SHOULD login the user if password is wrong', (done) => {
    const loginDetails = {
      email: 'tomblack@mandela.com',
      password: 'Ilovdogs#',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done(err);
      });
  });
  // it('SHOULD register the user if user doesn\'t exist', (done) => {
  //   const newUser = {
  //     firstname: 'Tom',
  //     lastname: 'huddlestone',
  //     othername: 'black',
  //     email: 'tomblack@mandela.com',
  //     phone: 19002000800,
  //     password: 'Ilove0dogs#',
  //   };
  //   chai.request(app)
  //     .post('/api/v1/auth/signup')
  //     .send(newUser)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.have.property('status').eql(200);
  //       res.body.should.be.a('object');
  //       res.body.data.should.be.a('array');
  //       res.body.data[0].should.have.property('token');
  //       done(err);
  //     });
  // });
  // it('SHOULD not register the user if there are conflicting unique parameters', (done) => {
  //   const newUser = {
  //     firstname: 'Nigel',
  //     lastname: 'henderson',
  //     othername: 'miller',
  //     email: 'nigelhenderson@great.com',
  //     phone: 18007593000,
  //     password: 'Ilovelove#',
  //   };
  //   chai.request(app)
  //     .post('/api/v1/auth/signup')
  //     .send(newUser)
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       res.body.should.have.property('status').eql(500);
  //       done(err);
  //     });
  // });
});
