'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  Dish.associate = function(models) {
    Dish.belongsTo(models.Menu, { foreignKey: 'MenuId' })
  };
  return Dish;
};