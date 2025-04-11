const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Shipment = sequelize.define(
  'Shipment',
  {
    // Primary Key
    id: {
      type: DataTypes.STRING,
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
        isEmail: {
          msg: 'Please provide a valid email address.',
        },
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'Contact number must contain only digits.',
        },
      },
    },

    // Receiver Information
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address.',
        },
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
        min: {
          args: [0.1],
          msg: 'Weight must be at least 0.1.',
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be at least 1.',
        },
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
      type: DataTypes.ENUM('Pending', 'In Transit', 'Delivered', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => 'SD' + uuidv4().slice(0, 10), // "SD" + 10 characters = 12 total
    },

    // Dates
    pickupDate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    deliveryDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departureTime: {
      type: DataTypes.STRING,
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

    ]
  }
);

module.exports = Shipment;