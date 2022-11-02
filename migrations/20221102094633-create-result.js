'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references:{
          model:'users',
          key: 'id',
        },
        allowNull: false
      },
      question_id: {
        type: Sequelize.UUID,
        references:{
          model:'questions',
          key: 'id',
        },
        allowNull: false
      },
      answer_selected: Sequelize.STRING,
      score: Sequelize.FLOAT,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('results');
  }
};