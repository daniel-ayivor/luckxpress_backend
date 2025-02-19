const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const Shipment = require('../model/TrackingModel');

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

const RegisterCourier = async (req, res) => {
  try {
    let {
      username,
      email,
      contact,
      packageName,
      packageTypes,
      weight,
      shipmentMode,
      carrier,
      origin,
      destination,
      pickupDate,
      deliveryDate,
      shipmentStatus,
      trackingCode = uuidv4().slice(0, 8), // Generate if tracking code is not provided
    } = req.body;

    console.log('Generated tracking code:', trackingCode);

    // Ensure packageTypes is stored as a string
    if (Array.isArray(packageTypes)) {
      packageTypes = packageTypes.join(',');
    }

    // Convert weight to numeric (assuming it may come as "8kg")
    const numericWeight = parseFloat(weight.replace(/[^\d.]/g, '')) || 0;

    // Save shipment details
    const shipment = await Shipment.create({
      username,
      email,
      contact,
      packageName,
      packageTypes,
      weight: numericWeight,
      shipmentMode,
      carrier,
      origin,
      destination,
      pickupDate,
      deliveryDate,
      shipmentStatus,
      trackingCode,
    });

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
    email,
    contact,
    packageName,
    packageTypes,
    weight,
    shipmentMode,
    carrier,
    origin,
    destination,
    pickupDate,
    deliveryDate,
    shipmentStatus,
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

module.exports = {
  RegisterCourier,
  getAllShipments,
  getShipmentByTrackingCode,
  updateShipment,
  deleteShipment,
  deleteAllShipments,
};
