const express = require('express');
const router = express.Router();
const {registerUser,loginUser, verifyToken, resetPassword,forgotPassword,logoutUser,getAllUsers,UserDelete, deleteAllUser, updateUser}= require("../controller/AuthController");



// user routes
router.post('/register', registerUser);
router.get('/verify', verifyToken);
router.post('/login', loginUser); 
router.put('/update/:id', updateUser); 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logoutUser); 
router.get('/getAllUser', getAllUsers); 
router.delete('/delete/:userId', UserDelete); 
router.delete('/delete', deleteAllUser); 
module.exports =router  
