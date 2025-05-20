const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Shipment = require('../model/TrackingModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "lxpresscargo.ltd@gmail.com",
    pass: "mbiu vyns cfzd auph"
  },
  logger: true,  // enable logging
  debug: true     // include SMTP traffic
});



const RegisterCourier = async (req, res) => {
  try {
    // Destructure and validate required fields
    const requiredFields = [
      'username', 'address', 'email', 'contact',
      'receiverName', 'receiverAddress', 'receiverEmail',
      'packageName', 'weight', 'quantity',
      'shipmentMode', 'shipmentType',  'carrierRefNumber'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    const {
      username,
      address,
      email,
      contact,
      receiverName,
      receiverAddress,
      receiverEmail,
      packageName,
      weight,
      quantity,
      shipmentMode,
      shipmentType,
      carrierRefNumber,
      origin,
      destination,
      pickupDate,
      deliveryDate,
      shipmentStatus,
      trackingCode: userProvidedTrackingCode
    } = req.body;

    // Generate tracking code
    const trackingCode = userProvidedTrackingCode || 'SD' + uuidv4().slice(0, 10);

    // Validate dates
    const pickupDateObj = pickupDate ? new Date(pickupDate) : new Date();
    const deliveryDateObj = deliveryDate ? new Date(deliveryDate) : null;

    if (isNaN(pickupDateObj.getTime())) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid pickup date format' 
      });
    }

    if (deliveryDate && isNaN(deliveryDateObj.getTime())) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid delivery date format' 
      });
    }

    // Validate weight and quantity
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight) || numericWeight <= 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Weight must be a number greater than zero' 
      });
    }

    const numericQuantity = parseInt(quantity);
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Quantity must be an integer greater than zero' 
      });
    }

 // Create and save shipment
const shipment = new Shipment({
  username,
  address,
  email,
  contact,
  receiverName,
  receiverAddress,
  receiverEmail,
  packageName,
  weight: numericWeight,
  quantity: numericQuantity,
  shipmentMode,
  shipmentType,
  carrierRefNumber,
  origin,
  destination,
  pickupDate: pickupDateObj,
  deliveryDate: deliveryDateObj,
  shipmentStatus: shipmentStatus || 'Pending',
  trackingCode
});

await shipment.save();

console.log('Shipment saved successfully:', shipment);
    // Send confirmation email
   // Send confirmation email
// Send confirmation email
try {
  console.log('Attempting to send email to:', email);
  
  const mailOptions = {
    from: '"Lxpress Cargo" <lxpresscargo.ltd@gmail.com>',  // More professional format
    to: email,
    subject: 'Your Shipment Tracking Code',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hello, ${username}</h2>
      <p>Your shipment has been registered successfully.</p>
      <p><strong>Tracking Code:</strong> ${trackingCode}</p>
      <p><strong>Status:</strong> ${shipment.shipmentStatus}</p>
      <p>Thank you for using our service!</p>
    </div>
    `
  };

  // Verify transporter connection first
  await transporter.verify();
  console.log('SMTP connection verified');

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected
  });
} catch (emailError) {
  console.error('Email sending failed with details:', {
    error: emailError.message,
    stack: emailError.stack,
    response: emailError.response,
    fullError: JSON.stringify(emailError, Object.getOwnPropertyNames(emailError))
  });
}

    res.status(201).json({
      success: true,
      message: 'Shipment created successfully',
      data: {
        trackingCode,
        shipmentId: shipment._id,
        status: shipment.shipmentStatus,
        email: shipment.email,
        username: shipment.username,
        createdAt: shipment.createdAt,  // Add this
        updatedAt: shipment.updatedAt   // Add this
      }
    });

  } catch (error) {
    console.error('Shipment creation error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Handle duplicate tracking code
    if (error.code === 11000 && error.keyPattern.trackingCode) {
      return res.status(400).json({
        success: false,
        message: 'Tracking code already exists',
        field: 'trackingCode'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all shipments
 */
const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: shipments.length,
      data: shipments.map(shipment => ({
        ...shipment.toObject(),
        createdAt: shipment.createdAt,
        updatedAt: shipment.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shipments',
      error: error.message
    });
  }
};

/**
 * Get shipment by ID
 */
const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingCode: req.params.id }); // Use trackingCode instead of _id
    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...shipment.toObject(),
        createdAt: shipment.createdAt,
        updatedAt: shipment.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching shipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shipment',
      error: error.message
    });
  }
};

/**
 * Get shipment by tracking code
 */
const getShipmentByTrackingCode = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ 
      trackingCode: req.params.trackingCode 
    });
    
    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        ...shipment.toObject(),
        createdAt: shipment.createdAt,
        updatedAt: shipment.updatedAt
      }
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shipment',
      error: error.message
    });
  }
};


/**
 * Update shipment
 */
const updateShipment = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = [
      'username', 'address', 'email', 'contact',
      'receiverName', 'receiverAddress', 'receiverEmail',
      'packageName', 'weight', 'quantity',
      'shipmentMode', 'shipmentType',  'carrierRefNumber',
      'origin', 'destination', 'pickupDate', 'deliveryDate',
      'shipmentStatus'
    ];

    // Build update object
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });



    // Validate dates if provided
    if (updates.pickupDate) {
      updates.pickupDate = new Date(updates.pickupDate);
      if (isNaN(updates.pickupDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid pickup date format'
        });
      }
    }

    if (updates.deliveryDate) {
      updates.deliveryDate = new Date(updates.deliveryDate);
      if (isNaN(updates.deliveryDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid delivery date format'
        });
      }
    }

    // Validate weight if provided
    if (updates.weight !== undefined) {
      updates.weight = parseFloat(updates.weight);
      if (isNaN(updates.weight)) {
        return res.status(400).json({
          success: false,
          message: 'Weight must be a number'
        });
      }
    }

    // Validate quantity if provided
    if (updates.quantity !== undefined) {
      updates.quantity = parseInt(updates.quantity);
      if (isNaN(updates.quantity)) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be an integer'
        });
      }
    }

    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shipment updated successfully',
      data: {
        ...shipment.toObject(),
        createdAt: shipment.createdAt,
        updatedAt: shipment.updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating shipment:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update shipment',
      error: error.message
    });
  }
};
/**
 * Delete shipment
 */
const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    
    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Shipment deleted successfully'
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to delete shipment',
      error: error.message
    });
  }
};

/**
 * Delete all shipments
 */
const deleteAllShipments = async (req, res) => {
  try {
    const result = await Shipment.deleteMany({});
    
    res.status(200).json({
      success: true,
      message: 'All shipments deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete shipments',
      error: error.message
    });
  }
};

/**
 * Validate shipment input middleware
 */
const validateShipmentInput = (req, res, next) => {
  const requiredFields = [
    'username', 'address', 'email', 'contact',
    'receiverName', 'receiverAddress', 'receiverEmail',
    'packageName', 'packageTypes', 'weight', 'quantity',
    'shipmentMode', 'shipmentType', 'carrier', 'carrierRefNumber'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      missingFields: missingFields.map(field => ({
        field,
        message: `${field} is required`
      }))
    });
  }

  // Validate email formats
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
      field: 'email'
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.receiverEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid receiver email format',
      field: 'receiverEmail'
    });
  }

  // Validate contact number
  if (!/^\+?[\d\s-]{6,}$/.test(req.body.contact)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid contact number format',
      field: 'contact'
    });
  }

  next();
};

module.exports = {
  RegisterCourier,
  getAllShipments,
  getShipmentById,
  getShipmentByTrackingCode,
  updateShipment,
  deleteShipment,
  deleteAllShipments,
  validateShipmentInput
};