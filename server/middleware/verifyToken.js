const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';  // The secret key used to verify the token

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Extract token from the Authorization header
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });  // If no token is provided, return an error
  }

  const token = authHeader.split(' ')[1];  // Extract the token from the header (after "Bearer")
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });  // If the token is invalid or expired, return an error
    }
    req.userId = decoded.id;  // Store the decoded information (e.g., user ID) in the request
    req.userRole = decoded.role;  // Store the user role from the token
    next();  // Continue to the next middleware or route if the token is valid
  });
};

module.exports = verifyToken;  // Export the middleware
