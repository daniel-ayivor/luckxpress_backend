const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");


const User = sequelize.define('User', {
 
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    // Other fields...
  
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Ensures username cannot be null
    validate: {
      notNull: {
        msg: 'Username is required', // Custom error message
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: {
        msg: 'Email is required',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required',
      },
    },
  },
}, {
  timestamps: true,
});

module.exports = User;
