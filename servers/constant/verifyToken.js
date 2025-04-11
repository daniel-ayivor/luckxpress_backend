const jwt = require('jsonwebtoken');

const verifyUser = (requiredRole) => {
  return async (req, res, next) => {
    // Set timeout for the verification process
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        res.status(504).json({ message: "Authentication timeout" });
      }
    }, 5000); // 5 second timeout

    try {
      // 1. Get token from cookies
      const token = req.cookies.token;
      const role = req.cookies.role;

      // 2. Check if token exists
      if (!token) {
        clearTimeout(timeout);
        return res.status(401).json({ message: "Unauthorized - No token provided" });
      }

      // 3. Verify token with timeout protection
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });

      // 4. Check role if required
      if (requiredRole && role !== requiredRole) {
        clearTimeout(timeout);
        return res.status(403).json({ message: "Forbidden - Insufficient permissions" });
      }

      // 5. Attach user to request and proceed
      req.user = decoded;
      clearTimeout(timeout);
      next();

    } catch (error) {
      clearTimeout(timeout);
      console.error("Token verification error:", error.name);

      // Handle specific JWT errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Session expired" });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      }

      return res.status(500).json({ message: "Authentication failed" });
    }
  };
};

module.exports = verifyUser;