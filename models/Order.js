'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    username: DataTypes.STRING,
    dishName: DataTypes.STRING,
    counter: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Menu, { foreignKey: 'UserId' })
  };
  return Order;
};