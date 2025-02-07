const express = require('express');
 const router = express.Router();

const { 
  RegisterCourier, 
  getAllShipments, 
  getShipmentByTrackingCode, 
  updateShipment, 
  deleteShipment ,
  deleteAllShipments
} = require('../controller/TrackingController');



// Shipment routes
router.delete('/shipmentsAll', deleteAllShipments); 
router.post('/shipments', RegisterCourier); // Create shipment
router.get('/shipments', getAllShipments); // Get all shipments
router.get('/shipments/:trackingCode', getShipmentByTrackingCode); // Get single shipment
router.put('/shipments/:trackingCode', updateShipment); // Update shipment
router.delete('/shipments/:trackingCode', deleteShipment); // Delete shipment

module.exports =router