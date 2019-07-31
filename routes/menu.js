const express = require("express");
const { body } = require("express-validator");

const menuController = require("../controllers/menu");

const adminAuthGuard = require("../middleware/adminAuthGuard");

const router = express.Router();

router.get("/menu", menuController.getMenu);
router.post("/menu/addDish/:MenuId",
 adminAuthGuard,
 body("name")
 .trim()
 .isLength({min:4})
 .not()
 .isEmpty(),
 body("description")
 .trim()
 .isLength({min:4})
 .not()
 .isEmpty(),
 body("img")
 .trim()
 .isLength({min:4})
 .not()
 .isEmpty(),
 menuController.addDish);

module.exports = router;
