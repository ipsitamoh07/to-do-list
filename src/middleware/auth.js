const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified:', verified);
    req.user = verified;
    next();
  } catch (error) {
    console.log('Invalid token:', error.message);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
