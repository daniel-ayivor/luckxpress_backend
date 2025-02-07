const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Shipment = sequelize.define(
  'Shipment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageTypes: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      get() {
        const value = this.getDataValue('weight');
        return value ? parseFloat(value) : 0;
      },
      set(value) {
        this.setDataValue('weight', parseFloat(value));
      },
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipmentStatus: {
      type: DataTypes.ENUM('Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  },
  {
    timestamps: true,
    tableName: 'Shipments',
    indexes: [] 
  }
);
 module.exports =Shipment
