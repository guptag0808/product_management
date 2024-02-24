const { Sequelize } = require('sequelize');
require('dotenv').config()
// Replace 'your_database', 'your_username', 'your_password' with your MySQL database details
const sequelize = new Sequelize('productManagement', process.env.adName, process.env.name, {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports={sequelize}