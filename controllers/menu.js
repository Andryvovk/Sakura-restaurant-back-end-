const { validationResult } = require("express-validator");
const Menu = require("../models").Menu;
const Dish = require("../models").Dish;

exports.getMenu = (req, res, next) => {
  Menu.findAll({
    include: [Dish]
  })
    .then(menu => {
      res.json(menu);
    })
    .catch(err => console.log(err))
};
exports.addDish = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    console.log(errors);
    throw error;
  }
    const name = req.body.name;
    const description = req.body.description;
    const img = req.body.img;
        Dish.create({
          name: name,
          description: description,
          img: img,
          MenuId: req.params.MenuId
        });
        return Dish.save()
      .then(result => {
        res.status(201).json({ message: 'Dish created!', userId: result._id });
      })
      .catch(err => {
        next(err);
      });
};
