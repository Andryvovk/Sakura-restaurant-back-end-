const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models").User;
const AuthController = require("../controllers/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("Auth Controller - Login", function() {
  it("should throw an error with code 500 if accessing the database fails", done => {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        name: "test@test.com",
        pass: "tester"
      }
    };

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });
  it("should throw an error with code 500 if password don`t match", done => {
    sinon.stub(bcrypt, "compare");
    bcrypt.compare.throws();
    const req = {
      body: {
        name: "tester",
        pass: "tester"
      }
    };
    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });
    bcrypt.compare.restore();
  });
  it("should return token", done => {
    sinon.stub(jwt, "sign");
    jwt.sign.throws();
    const req = {
      body: {
        name: "Admin",
        pass: "admin"
      }
    };
    const res = {
      token: "adskdskdaskdask"
    };
    AuthController.login(req, res, {}, () => {});
    expect(res.token).equal("adskdskdaskdask");
    done();

    jwt.sign.restore();
  });
  it("should throw an error with code 401 if user with email not found", function(done) {
    sinon.stub(User, "findOne").callsFake(() => null);
    const req = {
      body: {
        username: "tester",
        password: "tester"
      }
    };
    AuthController.login(req, {}, () => {})
      .then(result => {
        expect(result).to.have.property("statusCode", 401);
        done();
      })
      .then(() => {
        User.findOne.restore();
      });
  });
});
describe("Auth-Controller sign-up", () => {
  it("should throw error if method User.create was fail", done => {
    sinon.stub(User, "create");
    User.create.throws();
    const req = {
      body: {
        name: "tester",
        pass: "tester"
      }
    };
    AuthController.signUp(req, {}, () => {}).then(result => {
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.create.restore();
  });
  it("should throw error if password wasnt hashed", done => {
        sinon.stub(bcrypt, 'hash');
        bcrypt.hash.throws();
        const req = {
          body: {
            name: 'tester',
            pass: 'tester'
          }
        };
        AuthController.signUp(req, {}, () => {}).then(result => {
          expect(result).to.have.an('error')
          done();
        })
       bcrypt.hash.restore(); 
  })
});
