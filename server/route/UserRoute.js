const express = require('express');
const router = express.Router();
const {registerUser,loginUser, resetPassword,forgotPassword,logoutUser,getAllUsers,UserDelete, deleteAllUser}= require("../controller/AuthController");


// user routes
router.post('/register', registerUser);
router.post('/login', loginUser); 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logoutUser); 
router.get('/getAllUser', getAllUsers); 
router.delete('/delete/:userId', UserDelete); 
router.delete('/delete', deleteAllUser); 
module.exports =router  
