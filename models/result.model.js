const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

const Result = sequelize().define("results", {
  id:{
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  question_id: DataTypes.UUID,
  answer_selected: DataTypes.STRING,
  score: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Result.beforeUpdate(async (result, options) => {
  result.updated_at = new Date();
});

module.exports = Result;

