const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const Shipment = require('../model/TrackingModel');
const sequelize =require('../database/database')
// Create transporter for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  port: 587,
  secure: false,
});

// Register a new courier
const RegisterCourier = async (req, res) => {
  
  console.log(req.body);
  const transaction = await sequelize.transaction();

  try {
    const {
      username,
      address,
      email,
      contact,
      recieverName,
      recieverAddress,
      recieverEmail,
      packageName,
      packageTypes,
      weight,
      quantity,
      shipmentMode,
      shipmentType,
      carrier,
      carrierRefNumber,
      origin,
      destination,
      pickupDate,
      deliveryDate,
      shipmentStatus ,
      trackingCode 
    } = req.body;

    // Parse and validate pickup and delivery dates
    const pickupDateValue = pickupDate ? new Date(pickupDate) : null;
    const deliveryDateValue = deliveryDate ? new Date(deliveryDate) : null;

    if (pickupDate && isNaN(pickupDateValue)) {
      return res.status(400).json({ message: 'Invalid pickup date format.' });
    }
    if (deliveryDate && isNaN(deliveryDateValue)) {
      return res.status(400).json({ message: 'Invalid delivery date format.' });
    }

    // Validate weight
    const numericWeight = parseFloat(
      weight && typeof weight === 'string' ? weight.replace(/[^\d.]/g, '') : weight
    ) || 0;
    if (numericWeight <= 0) {
      return res.status(400).json({ message: 'Weight must be greater than zero.' });
    }

    // Ensure packageTypes is a string
    const formattedPackageTypes = Array.isArray(packageTypes) ? packageTypes.join(',') : packageTypes;

    // Save shipment to the database
    const shipment = await Shipment.create(
      {
        username,
        address,
        email,
        contact,
        recieverName,
        recieverAddress,
        recieverEmail,
        packageName,
        packageTypes: formattedPackageTypes,
        weight,
        quantity,
        shipmentMode,
        shipmentType,
        carrier,
        carrierRefNumber,
        origin,
        destination,
        pickupDate,
        deliveryDate,
        shipmentStatus ,
        trackingCode 
      },
     
    );


    // Send email with tracking code
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Shipment Tracking Code',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
          .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { font-size: 24px; font-weight: bold; color: #333; text-align: center; margin-bottom: 20px; }
          .content { font-size: 16px; color: #555; line-height: 1.6; }
          .tracking-code { font-size: 18px; font-weight: bold; color: #82ca9d; text-align: center; margin: 20px 0; }
          .footer { font-size: 14px; color: #888; text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">Hello, ${username}</div>
          <div class="content">
            <p>Your tracking code is:</p>
            <div class="tracking-code">${trackingCode}</div>
            <p>Thank you for using our service!</p>
          </div>
          <div class="footer">
            &copy; 2025 Your Company. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `,
    });

    res.status(201).json({ message: 'Shipment created and email sent', shipment });
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ message: 'Error creating shipment', error });
  }
};

// Get all shipments
const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.status(200).json({ message: 'Shipments retrieved successfully', shipments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving shipments', error });
  }
};

// Get a single shipment by tracking code
const getShipmentByTrackingCode = async (req, res) => {
  const { trackingCode } = req.params;

  try {
    const shipment = await Shipment.findOne({ where: { trackingCode } });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.status(200).json({ message: 'Shipment retrieved successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving shipment', error });
  }
};

// Update a shipment by tracking code
const updateShipment = async (req, res) => {
  const { trackingCode } = req.params;
  const {
    username,
    address,
    email,
    contact,
    recieverName,
    recieverAddress,
    recieverEmail,
    packageName,
    packageTypes,
    weight,
    quantity,
    shipmentMode,
    shipmentType,
    carrier,
    carrierRefNumber,
    origin,
    destination,
    pickupDate,
    deliveryDate,
    shipmentStatus ,
  
  } = req.body;

  try {
    const shipment = await Shipment.findOne({ where: { trackingCode } });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Update shipment details
    await shipment.update({
      username,
      email,
      contact,
      packageName,
      packageTypes: Array.isArray(packageTypes) ? packageTypes.join(',') : packageTypes,
      weight,
      shipmentMode,
      carrier,
      origin,
      destination,
      pickupDate,
      deliveryDate,
      shipmentStatus,
    });

    res.status(200).json({ message: 'Shipment updated successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shipment', error });
  }
};

// Delete a shipment by tracking code
const deleteShipment = async (req, res) => {
  const { trackingCode } = req.params;

  try {
    const shipment = await Shipment.findOne({ where: { trackingCode } });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Delete shipment
    await shipment.destroy();

    res.status(200).json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shipment', error });
  }
};

// Delete all shipments
const deleteAllShipments = async (req, res) => {
  try {
    const result = await Shipment.destroy({ where: {} });

    if (result === 0) {
      return res.status(404).json({ message: 'No shipments found to delete' });
    }

    res.status(200).json({ message: 'All shipments deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shipments', error });
  }
};

const validateShipmentInput = (req, res, next) => {
  const {
    username,
    address,
    email,
    contact,
    recieverName,
    recieverAddress,
    recieverEmail,
    packageName,
    packageTypes,
    weight,
    quantity,
    shipmentMode,
    shipmentType,
    carrier,
    carrierRefNumber,
  } = req.body;

  const requiredFields = [
    { name: "username", value: username },
    { name: "address", value: address },
    { name: "email", value: email },
    { name: "contact", value: contact },
    { name: "recieverName", value: recieverName },
    { name: "recieverAddress", value: recieverAddress },
    { name: "recieverEmail", value: recieverEmail },
    { name: "packageName", value: packageName },
    { name: "packageTypes", value: packageTypes },
    { name: "quantity", value: quantity },
    { name: "shipmentType", value: shipmentType },
    { name: "carrierRefNumber", value: carrierRefNumber },
  ];

  const missingFields = requiredFields.filter((field) => !field.value);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields: missingFields.map((field) => field.name),
    });
  }

  if (!/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  if (!/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,7}$/.test(recieverEmail)) {
    return res.status(400).json({ message: "Invalid receiver email format!" });
  }

  if (!/^\d+$/.test(contact)) {
    return res.status(400).json({ message: "Invalid contact format!" });
  }

  next();
};


module.exports = {
  RegisterCourier,
  getAllShipments,
  getShipmentByTrackingCode,
  updateShipment,
  deleteShipment,
  deleteAllShipments,
  validateShipmentInput
};
