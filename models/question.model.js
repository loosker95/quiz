const { DataTypes } = require("sequelize");
const Answer = require("./answer.model");
const sequelize = require("./connect");

const Question = sequelize().define("questions", {
  id:{
    primaryKey: true,
    unique: true,
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


Question.hasMany(Answer, {
  foreignKey: 'question_id'
})
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: 'id' 
})


module.exports = Question;
