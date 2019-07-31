const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authGuard = require('../middleware/authGuard');
const adminAuthGuard = require('../middleware/adminAuthGuard');

describe('Auth middleware', function() {
  it('should throw an error if no authorization header is present', function() {
    const req = {
      get: function(headerName) {
        return null;
      }
    };
    expect(authGuard.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated'
    );
  });

  it('should throw an error if the authorization header is only one string', function() {
    const req = {
      get: function(headerName) {
        return 'xyz';
      }
    };
    expect(authGuard.bind(this, req, {}, () => {})).to.throw();
  });

  it('should yield a userId after decoding the token', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer djfkalsdjfaslfjdlas';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc'});
    authGuard(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
 
  it('should throw an error if the token cannot be verified', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer xyz';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns(null);
    expect(authGuard.bind(this, req, {}, () => {})).to.throw("Not authenticated");
    jwt.verify.restore();
  });
  it('should throw an error if the token cannot be verified', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer xyz';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({role: 'not admin'});
    expect(adminAuthGuard.bind(this, req, {}, () => {})).to.throw("you don`t have permission");
    jwt.verify.restore();
  });
});
describe('Admin auth guard', () => {
  it('should throw an error if no authorization header is present', function() {
    const req = {
      get: function(headerName) {
        return null;
      }
    };
    expect(adminAuthGuard.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated'
    );
  });
  it('should throw an error if the authorization header is only one string', function() {
    const req = {
      get: function(headerName) {
        return 'xyz';
      }
    };
    expect(adminAuthGuard.bind(this, req, {}, () => {})).to.throw();
  });
  it('should yield a userId after decoding the token', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer djfkalsdjfaslfjdlas';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc', role: 'admin'});
    adminAuthGuard(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
  it('should throw an error if the token cannot be verified', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer xyz';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({role: "adasda"});
    expect(adminAuthGuard.bind(this, req, {}, () => {})).to.throw("you don`t have permission");
    jwt.verify.restore();
  });
})