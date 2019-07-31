'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Menus', [{
      name : 'hot-dishes',
      description : 'hot-dishes with the Japanese spirit',
      img : 'https://yaponahata.com/upload/iblock/1d6/1d630259ab943b3a73db6c3e73228081.jpg',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Menus', [{
      name :'hot-dishes'
    }])
  }
};