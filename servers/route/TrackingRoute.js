const express = require('express');
 const router = express.Router();

const { 
  RegisterCourier, 
  getAllShipments, 
  getShipmentByTrackingCode, 
  updateShipment, 
  deleteShipment ,
  deleteAllShipments,
  getShipmentById,
  validateShipmentInput
} = require('../controller/TrackingController');



// Shipment routes
router.delete('/shipmentsAll', deleteAllShipments); 
router.post('/shipments', RegisterCourier); 
router.get('/shipments', getAllShipments); 
router.get('/shipments/:id', getShipmentById); 
router.post('/shipments/:trackingCode', getShipmentByTrackingCode); 
router.put('/shipments/:id', updateShipment);
router.delete('/shipments/:id', deleteShipment);

module.exports =router