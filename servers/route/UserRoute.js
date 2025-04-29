const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyToken,
  resetPassword,
  forgotPassword,
  logoutUser,
  getAllUsers,
  UserDelete,
  deleteAllUser,
  updateUser,
  getUserProfile,
  changePassword,
  checker,
} = require("../controller/AuthController");
const authMiddleware = require('../constant/authMiddleware');


// User routes
router.post('/register', registerUser);
router.get('/verify', verifyToken);
router.get('/check', checker);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', authMiddleware, logoutUser);
router.post('/change/password', authMiddleware, changePassword);

// Protected admin routes
router.get('/profile', authMiddleware, getUserProfile); 
router.put('/update/:id', authMiddleware, updateUser);
router.get('/getAllUser', authMiddleware, getAllUsers);
router.delete('/delete/:id', authMiddleware, UserDelete);
router.delete('/delete', authMiddleware, deleteAllUser);

module.exports = router;