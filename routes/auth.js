const express = require("express");
const { body } = require("express-validator");
const User = require("../models").User;
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("username")
      .custom((value, { req }) => {
        return User.findOne({ where: { username: value } }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("name already exists!");
          }
        });
      })
      .not()
      .isEmpty(),
    body("password")
      .trim()
      .isLength({ min: 5 })
  ],
  authController.signUp
);
router.post("/login", authController.login);
module.exports = router;
