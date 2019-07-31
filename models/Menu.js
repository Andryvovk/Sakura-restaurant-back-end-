'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  Menu.associate = function(models) {
    Menu.hasMany(models.Dish)
  };
  return Menu;
};