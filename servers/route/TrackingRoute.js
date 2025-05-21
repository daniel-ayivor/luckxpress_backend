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
router.get('/shipments/:trackingCode', getShipmentByTrackingCode); 
router.get('/shipments', getAllShipments); 
router.get('/shipments/update/:id', getShipmentById); 
router.put('/shipments/update/:id', updateShipment);
router.delete('/shipments/delete/:id', deleteShipment);

module.exports =router