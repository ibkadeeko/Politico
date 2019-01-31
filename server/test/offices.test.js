/* eslint-disable no-trailing-spaces */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('Offices', () => {
  it('should CREATE a SINGLE office on /offices POST', (done) => {
    const newOffice = {
      id: 1,
      type: 'state',
      name: 'governor of kogi',
    };
    chai.request(app)
      .post('/api/v1/politico/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done(err);
      });
  });

  const nameOmitted = {
    type: 'federal',
  };
  it('should NOT create office if NAME field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/politico/offices')
      .send(nameOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('office Name is required');
        done(err);
      });
  });
});
