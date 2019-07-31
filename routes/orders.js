const express = require("express");
const { body } = require("express-validator");

const ordersController = require('../controllers/orders');

const adminAuthGuard = require('../middleware/adminAuthGuard')
const authGuard = require('../middleware/authGuard');

const router = express.Router();



router.get("/orders",adminAuthGuard, ordersController.getOrders);
router.post("/add-order/:UserId",authGuard, ordersController.addOrders);
router.delete("/delete/:id",adminAuthGuard, ordersController.submitOrders);
module.exports = router;