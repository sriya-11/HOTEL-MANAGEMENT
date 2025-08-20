const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if Authorization header exists
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' prefix
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add customerId to request object
    req.customerId = decoded.id;  
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
