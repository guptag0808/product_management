// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  // Verify the token
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }

    // Attach the user information to the request for further use
    req.user = user;
    
    // Continue to the next middleware or route
    next();
  });
};

module.exports = { authenticateToken };
