const { DataTypes } = require("sequelize");
const sequelize = require("./connect");
const bcrypt = require("bcryptjs");

const users = sequelize().define("users", {
  id:{
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isAlphanumeric: true,
  },
  fullname: {
    type: DataTypes.STRING,
    isAlphanumeric: true,
  },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
    min: 8
  },
  avatar: DataTypes.STRING,
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

users.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 8);
});



module.exports = users;