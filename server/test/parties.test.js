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

// Test Values
const nameOmitted = {
  hqaddress: 'Abuja, Nigeria',
  logourl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};
const addressOmitted = {
  name: 'PDP',
  logourl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};
const logoUrlOmitted = {
  name: 'PDP',
  hqaddress: 'Abuja, Nigeria',
};
const adminDetails = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

let token;

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

describe('PARTIES ROUTES', () => {
  describe('POST /parties', () => {
    it('should NOT CREATE if party already exists', (done) => {
      const newParty = {
        name: 'peoples democratic party',
        hqaddress: 'abuja, nigeria',
        logourl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400);
          done(err);
        });
    });
    it('should NOT CREATE party if NAME field is OMITTED', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send(nameOmitted)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.eql('Party Name is required');
          done(err);
        });
    });
    it('should NOT CREATE party if ADDRESS field is OMITTED', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send(addressOmitted)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.eql('Address is required');
          done(err);
        });
    });
    it('should NOT CREATE party if LOGOUrl field is OMITTED', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send(logoUrlOmitted)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').eql('logoUrl is required');
          done(err);
        });
    });
    it('should CREATE a single party', (done) => {
      const newParty = {
        name: 'PDP',
        hqaddress: 'Abuja, Nigeria',
        logourl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .send(newParty)
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
  
  describe('GET /parties', () => {
    it('should LIST ALL parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          done(err);
        });
    });
  });

  it('On ANY /parties/<id> request It SHOULD NOT work if id is not a number', (done) => {
    const id = '1xae4rg2';
    chai.request(app)
      .patch(`/api/v1/parties/${id}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done(err);
      });
  });
  
  describe('GET /parties/<id>', () => {
    it('should NOT LIST a single party if id is not found', (done) => {
      const id = 999;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('should LIST a SINGLE party', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          res.body.data[0].id.should.equal(id);
          done(err);
        });
    });
  });
  
  describe('PATCH /parties/<id>', () => {
    it('should NOT UPDATE if party is not found', (done) => {
      const id = 999;
      chai.request(app)
        .patch(`/api/v1/parties/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('should NOT UPDATE if party already exists', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`/api/v1/parties/${id}`)
        .send({ name: 'peoples democratic party' })
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('should UPDATE a single party', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`/api/v1/parties/${id}`)
        .send({ name: 'kowa party' })
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name').equal('kowa party');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          done(err);
        });
    });
  });
  
  describe('DELETE /parties/<id>', () => {
    it('should NOT DELETE if party is not found', (done) => {
      const id = 999;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
    it('should DELETE a single party', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('message');
          done(err);
        });
    });
    it('should NOT DELETE if party is already deleted', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done(err);
        });
    });
  });
});
