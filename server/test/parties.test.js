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
  it('should NOT CREATE if party already exists on /parties POST', (done) => {
    const newParty = {
      name: 'peoples democratic party',
      hqAddress: 'abuja, nigeria',
      logoUrl: 'link',
    };
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
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
  it('should NOT CREATE party if NAME field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(nameOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Party Name is required');
        done(err);
      });
  });
  it('should NOT CREATE party if ADDRESS field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/politico/parties')
      .send(addressOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Address is required');
        done(err);
      });
  });
  it('should NOT CREATE party if LOGOUrl field is OMITTED', (done) => {
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
  it('should NOT LIST a single party on /parties/<id> GET', (done) => {
    const id = 999;
    chai.request(app)
      .get(`/api/v1/politico/parties/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
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
  it('should NOT UPDATE a party on /parties/<id> PUT', (done) => {
    const id = 999;
    chai.request(app)
      .put(`/api/v1/politico/parties/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should UPDATE a single party on /parties/<id> PUT', (done) => {
    const id = 1;
    chai.request(app)
      .put(`/api/v1/politico/parties/${id}`)
      .send({ name: 'pdp' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name').equal('pdp');
        res.body.data[0].should.have.property('hqAddress');
        res.body.data[0].should.have.property('logoUrl');
        done();
      });
  });
  it('should NOT DELETE a party on /parties/<id> DELETE', (done) => {
    const id = 999;
    chai.request(app)
      .delete(`/api/v1/politico/parties/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should DELETE a single party on /parties/<id> DELETE', (done) => {
    const id = 1;
    chai.request(app)
      .delete(`/api/v1/politico/parties/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data[0].should.have.property('message');
        done();
      });
  });
});
