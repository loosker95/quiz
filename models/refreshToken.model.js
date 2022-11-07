const { DataTypes} = require("sequelize");
const sequelize = require("./connect");

const Token = sequelize().define("tokens", {
  id:{
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  token: DataTypes.STRING,
  refresh_token: DataTypes.STRING,
  expiration_delay: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Token;

