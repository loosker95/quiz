const { DataTypes} = require("sequelize");
const sequelize = require("./connect");

const Answer = sequelize().define("answers", {
  id:{
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  question_id: DataTypes.UUID,
  answers: DataTypes.STRING,
  is_correct: DataTypes.BOOLEAN,
  image: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Answer.beforeUpdate(async (answer, options) => {
    answer.updated_at = new Date();
});

module.exports = Answer;