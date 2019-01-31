/* eslint-disable no-trailing-spaces */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('Parties', () => {
  it('should CREATE a SINGLE party on /parties POST', (done) => {
    const newParty = {
      name: 'PDP',
      hqAddress: 'Abuja, Nigeria',
      logoUrl: 'link',
    };
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done(err);
      });
  });

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
  it('should NOT create party if NAME field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(nameOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Party Name is required');
        done(err);
      });
  });
  it('should NOT create party if ADDRESS field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(addressOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Address is required');
        done(err);
      });
  });
  it('should NOT create party if LOGOUrl field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(logoUrlOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('logoUrl is required');
        done(err);
      });
  });
  it('should LIST ALL parties on /parties GET', (done) => {
    chai.request(app)
      .get('/api/v1/politico/parties')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('hqAddress');
        res.body.data[0].should.have.property('logoUrl');
        done();
      });
  });
  it('should LIST a SINGLE party on /parties/<id> GET', (done) => {
    const id = 1;
    chai.request(app)
      .get(`/api/v1/politico/parties/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('hqAddress');
        res.body.data[0].should.have.property('logoUrl');
        res.body.data[0].id.should.equal(id);
        done();
      });
  });
});
