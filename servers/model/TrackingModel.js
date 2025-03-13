const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

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
      validate: {
        is: /^[0-9]+$/, // Only numbers allowed
      },
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
      validate: {
        min: 0.1, 
      },
      get() {
        const value = this.getDataValue('weight');
        return value ? parseFloat(value) : 0;
      },
      set(value) {
        this.setDataValue('weight', parseFloat(value));
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Quantity must be at least 1
      },
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
    shipmentStatus: {
      type: DataTypes.ENUM('Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => uuidv4().slice(0, 12), // Generate default tracking code
    },

    // Dates
    pickupDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // Locations
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Payment Information
    paymentMode: {
      type: DataTypes.ENUM('Cash', 'Card', 'Online Transfer'),
      allowNull: true,
    },
    TotalFreight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'Shipments',
    indexes: [
      { fields: ['trackingCode'] },
      { fields: ['shipmentStatus'] },
      { fields: ['origin'] },
      { fields: ['destination'] },
    ],
  }
);

module.exports = Shipment;