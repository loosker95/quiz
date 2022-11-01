'use strict';

const Sequelize = require('sequelize');
const db = require('./connect')

const seq = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: DataTypes.INTEGER,
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
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
      min: 8
    },
    avatar: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      isIn: [['admin', 'basic']]
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};

