
const express = require('express');
 const router = express.Router();
const handleMessage =require("../controller/MessageController");
router.post("/api/message", handleMessage);


module.exports = router