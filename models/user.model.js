const { DataTypes } = require("sequelize");
const sequelize = require("./connect");
const bcrypt = require("bcryptjs");
const Result = require("./result.model");
const Token = require("./refreshToken.model");

const User = sequelize().define("users", {
  id:{
    primaryKey: true,
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
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 'false',
  },
  password: {
    type: DataTypes.STRING(64),
    min: 8
  },
  avatar: DataTypes.STRING,
  roles: {
    type: DataTypes.STRING,
    defaultValue: 'user',
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

User.hasMany(Result, {foreignKey: 'user_id', targetKey: 'id'})
User.hasMany(Token, {foreignKey: 'user_id', targetKey: 'id'})

User.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 8);
  user.verified = false
});


User.beforeUpdate(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
    user.updated_at = new Date();
});

User.isEmailTaken = async (_email) => {
  const users = await User.findOne({ where: { email: _email } });
  return !!users;
};

User.isUsernameTaken = async (_username) => {
  const users = await User.findOne({ where: { username: _username } });
  return !!users;
};

User.isIdValid = async (_id) => {
  const users = await User.findOne({ where: { id: _id } });
  return users;
};

module.exports = User;