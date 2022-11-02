'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      question_id: {
        type: Sequelize.UUID,
        references:{
          model:'questions',
          key: 'id',
        },
        allowNull: false
      },
      answers: {
        type: Sequelize.STRING
      },
      is_correct: Sequelize.BOOLEAN,
      image: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('answers');
  }
};