const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Shipment = sequelize.define(
  'Shipment',
  {
    // Primary Key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Sender Information
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
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

    // Receiver Information
    recieverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recieverAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recieverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    // Package Information
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
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Shipment Details
    shipmentMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrierRefNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    shipmentStatus: {
      type: DataTypes.ENUM('Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },

    // Dates
    pickupDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Locations
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Payment Information
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TotalFrieght: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Shipments',
    indexes: [],
  }
);

module.exports = Shipment;
