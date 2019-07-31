const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models").User;

exports.signUp = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        console.log(errors)
        throw error;
      }
      try{
        const username = req.body.username;
        const password = req.body.password;
        bcrypt
          .hash(password, 12)
          .then(hashedPw => {
            User.create({
              username: username,
              password: hashedPw,
              role: 'user'
            });
            return User.save();
          })
          .then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id });
          })
          if (!hashedPw) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
          }
      }
      catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
         return err;
      }
    };

    exports.login = async (req, res, next) => {
      const username = req.body.username;
      const password = req.body.password;
      let loadedUser;
      try {
        const user = await User.findOne({ where: {username : username} });
        if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        const isEqual =  bcrypt.compare(password, user.password);
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            username: loadedUser.username,
            role: loadedUser.role
          },
          'secret',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, username: loadedUser.username, role: loadedUser.role });
        return;
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
         return err;
      }
    };
