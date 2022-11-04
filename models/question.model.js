const { DataTypes } = require("sequelize");
const Answer = require("./answer.model");
const sequelize = require("./connect");
const Result = require("./result.model");

const Question = sequelize().define("questions", {
  id:{
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  question: DataTypes.STRING,
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

Question.hasMany(Answer, { foreignKey: 'question_id', targetKey: 'id'})
Question.hasMany(Result, { foreignKey: 'question_id', targetKey: 'id'})

Question.beforeUpdate(async (question, options) => {
  question.updated_at = new Date();
});

module.exports = Question;
