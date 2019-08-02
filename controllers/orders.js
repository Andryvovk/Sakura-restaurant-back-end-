const Orders = require("../models").Order;
const { validationResult } = require("express-validator");

exports.getOrders = (req, res, next) => {
  Orders.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => console.log("error " + err));
};
exports.addOrders = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    console.log(errors);
    throw error;
  }
    const username = req.body.username;
    const dishName = req.body.dishName;
    const counter = req.body.counter;
        Orders.create({
          username: username,
          dishName: dishName,
          counter: counter,
          UserId: req.params.UserId
        });
        return Dish.save()

        .then(result => {
          res.status(201).json({ message: 'Order created!', userId: result._id });
        })
        .catch(err => {
          next(err);
        });
};
exports.submitOrders = async (req, res, next) => {
    const id = req.params.id;
    Orders.destroy({
      where: {
        id: id
      }
    })
    return Orders.save()

    .then(result => {
      res.status(201).json({ message: 'Order go to the kitchen!', userId: result._id });
    })
    .catch(err => {
      next(err);
    });
};
