// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // 1. Get token from either cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach user to request
    req.user = {
      userId: decoded.userId,  // Make sure this matches your JWT payload
      role: decoded.role
    };
    
    next();
  } catch (error) {

    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};