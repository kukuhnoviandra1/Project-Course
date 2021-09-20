'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      sub_category: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.STRING
      },
      total_materi: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      student: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};