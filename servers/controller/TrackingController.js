const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Shipment = require('../model/TrackingModel'); // This will now point to a Mongoose model

// Create transporter for sending email (same as before)
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
  const session = await mongoose.startSession();
  session.startTransaction();

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
      shipmentStatus,
      trackingCode: userProvidedTrackingCode
    } = req.body;

    // Generate a unique tracking code if not provided
    const trackingCode = userProvidedTrackingCode || 'SD' + uuidv4().slice(0, 10);

    // Map the misspelled fields to the correct field names
    const receiverName = recieverName;
    const receiverAddress = recieverAddress;
    const receiverEmail = recieverEmail;

    // Parse and validate pickup and delivery dates
    const pickupDateValue = pickupDate ? new Date(pickupDate) : null;
    const deliveryDateValue = deliveryDate ? new Date(deliveryDate) : null;

    if (pickupDate && isNaN(pickupDateValue)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Invalid pickup date format.' });
    }
    if (deliveryDate && isNaN(deliveryDateValue)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Invalid delivery date format.' });
    }

    // Validate weight
    const numericWeight = parseFloat(
      weight && typeof weight === 'string' ? weight.replace(/[^\d.]/g, '') : weight
    ) || 0;
    if (numericWeight <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Weight must be greater than zero.' });
    }

    // Ensure packageTypes is an array (MongoDB handles arrays natively)
    const formattedPackageTypes = Array.isArray(packageTypes) ? packageTypes : [packageTypes];

    // Save shipment to the database
    const shipment = new Shipment({
      username,
      address,
      email,
      contact,
      receiverName,
      receiverAddress,
      receiverEmail,
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
      shipmentStatus,
      trackingCode
    });

    await shipment.save({ session });

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

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Shipment created and email sent', shipment });
  } catch (error) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating shipment:', error);
    res.status(500).json({ message: 'Error creating shipment', error });
  }
};

// Get all shipments
const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json({ message: 'Shipments retrieved successfully', shipments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving shipments', error });
  }
};

// Get a single shipment by id
const getShipmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const shipment = await Shipment.findById(id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.status(200).json({ message: 'Shipment retrieved successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving shipment', error });
  }
};

// Get a single shipment by tracking code
const getShipmentByTrackingCode = async (req, res) => {
  const { trackingCode } = req.params;

  try {
    const shipment = await Shipment.findOne({ trackingCode });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.status(200).json({ message: 'Shipment retrieved successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving shipment', error });
  }
};

// Update a shipment by id
const updateShipment = async (req, res) => {
  const { id } = req.params;
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
    shipmentStatus,
  } = req.body;

  try {
    const shipment = await Shipment.findById(id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Update shipment details
    shipment.username = username || shipment.username;
    shipment.address = address || shipment.address;
    shipment.email = email || shipment.email;
    shipment.contact = contact || shipment.contact;
    shipment.receiverName = recieverName || shipment.receiverName;
    shipment.receiverAddress = recieverAddress || shipment.receiverAddress;
    shipment.receiverEmail = recieverEmail || shipment.receiverEmail;
    shipment.packageName = packageName || shipment.packageName;
    shipment.packageTypes = Array.isArray(packageTypes) ? packageTypes : [packageTypes] || shipment.packageTypes;
    shipment.weight = weight || shipment.weight;
    shipment.quantity = quantity || shipment.quantity;
    shipment.shipmentMode = shipmentMode || shipment.shipmentMode;
    shipment.shipmentType = shipmentType || shipment.shipmentType;
    shipment.carrier = carrier || shipment.carrier;
    shipment.carrierRefNumber = carrierRefNumber || shipment.carrierRefNumber;
    shipment.origin = origin || shipment.origin;
    shipment.destination = destination || shipment.destination;
    shipment.pickupDate = pickupDate || shipment.pickupDate;
    shipment.deliveryDate = deliveryDate || shipment.deliveryDate;
    shipment.shipmentStatus = shipmentStatus || shipment.shipmentStatus;

    await shipment.save();

    res.status(200).json({ message: 'Shipment updated successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shipment', error });
  }
};

// Delete a shipment by id
const deleteShipment = async (req, res) => {
  const { id } = req.params;

  try {
    const shipment = await Shipment.findByIdAndDelete(id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.status(200).json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shipment', error });
  }
};

// Delete all shipments
const deleteAllShipments = async (req, res) => {
  try {
    const result = await Shipment.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No shipments found to delete' });
    }

    res.status(200).json({ message: 'All shipments deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shipments', error });
  }
};

// Input validation (same as before)
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
  validateShipmentInput,
  getShipmentById
};