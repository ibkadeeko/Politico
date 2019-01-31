import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('POST create party', () => {
  it('it should create a party if the details are complete', (done) => {
    const newParty = {
      name: 'PDP',
      hqAddress: 'Abuja, Nigeria',
      logoUrl: 'link',
    };
    chai.request(app)
      .post('/api/politico/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done(err);
      });
  });
});

describe('POST create party', () => {
  const nameOmitted = {
    hqAddress: 'Abuja, Nigeria',
    logoUrl: 'link',
  };
  const addressOmitted = {
    name: 'PDP',
    logoUrl: 'link',
  };
  const logoUrlOmitted = {
    name: 'PDP',
    hqAddress: 'Abuja, Nigeria',
  };
  it('IT should not create party if name field is omitted', (done) => {
    chai.request(app)
      .post('/api/politico/v1/parties')
      .send(nameOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Party Name is required');
        done(err);
      });
  });
  it('IT should not create party if hqAddress field is omitted', (done) => {
    chai.request(app)
      .post('/api/politico/v1/parties')
      .send(addressOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Address is required');
        done(err);
      });
  });
  it('IT should not create party if logoUrl field is omitted', (done) => {
    chai.request(app)
      .post('/api/politico/v1/parties')
      .send(logoUrlOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('logoUrl is required');
        done(err);
      });
  });
});
