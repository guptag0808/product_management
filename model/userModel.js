// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronize the model with the database (creates the User table if it doesn't exist)
sequelize.sync({ force: false }).then(() => {
  console.log('User model synchronized with the database.');
});

module.exports = { User };
