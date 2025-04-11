const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(), // Generate UUID automatically
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Username is required', // Custom error message
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required',
      },
    },
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'contact is required',
      },
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "member"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'contact is required',
      },
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'), // Add status field
    allowNull: false,
    defaultValue: 'active', // Default status is 'active'
  },
}, {
  timestamps: true,
});

module.exports = User;