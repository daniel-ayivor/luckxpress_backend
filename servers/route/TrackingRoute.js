const express = require('express');
 const router = express.Router();

const { 
  RegisterCourier, 
  getAllShipments, 
  getShipmentByTrackingCode, 
  updateShipment, 
  deleteShipment ,
  deleteAllShipments,
  validateShipmentInput
} = require('../controller/TrackingController');



// Shipment routes
router.delete('/shipmentsAll', deleteAllShipments); 
router.post('/shipments', RegisterCourier); 
router.get('/shipments', getAllShipments); 
router.get('/shipments/:trackingCode', getShipmentByTrackingCode); 
router.put('/shipments/:trackingCode', updateShipment);
router.delete('/shipments/:trackingCode', deleteShipment);

module.exports =router