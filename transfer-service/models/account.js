const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Account = sequelize.define('Account', {
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Account;
