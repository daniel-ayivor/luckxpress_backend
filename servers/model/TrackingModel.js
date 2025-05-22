const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const shipmentSchema = new mongoose.Schema({
  // Sender Information
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  contact: {
    type: String,
    required: [true, 'Contact is required'],
    validate: {
      validator: function(v) {
        return /^[0-9]+$/.test(v);
      },
      message: props => `${props.value} must contain only digits!`
    }
  },

  // Receiver Information
  receiverName: {
    type: String,
    required: [true, 'Receiver name is required'],
  },
  receiverAddress: {
    type: String,
    required: [true, 'Receiver address is required'],
  },
  receiverEmail: {
    type: String,
    required: [true, 'Receiver email is required'],
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },

  // Package Information
  packageName: {
    type: String,
    required: [true, 'Package name is required'],
  },

  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0.1, 'Weight must be at least 0.1']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },

  // Shipment Details
  shipmentMode: {
    type: String,
    required: [true, 'Shipment mode is required'],
  },
  shipmentType: {
    type: String,
    required: [true, 'Shipment type is required'],
  },
  carrierRefNumber: {
    type: String,
    required: [true, 'Carrier reference number is required'],
  },
  shipmentStatus: {
    type: String,
    enum: ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered', 'On hold'],
    default: 'Pending'
  },
ShipmentUpdate: {
  type: String,
  required: false // this field is optional
},

  trackingCode: {
    type: String,
    default: () => 'SD' + uuidv4().slice(0, 10),
    unique: true,
    index: true 
  },

  // Dates
  pickupDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: Date,
  departureTime: String,

  // Locations
  origin: String,
  destination: String,

  // Payment Information
  paymentMode: {
    type: String,
    enum: ['Cash', 'Card', 'Online Transfer']
  },
  TotalFreight: Number
}, {
  timestamps: true
});



module.exports = mongoose.model('Shipment', shipmentSchema);