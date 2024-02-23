// Assuming this is your model definition in 'models/user.js'
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path accordingly

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ... other fields
});

module.exports = User;
