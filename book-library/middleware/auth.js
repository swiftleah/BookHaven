const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'f310805a97f03af69ed62936639e680a1b2b838dff0157f9e1cd4ba38479e4df');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token is not valid', err); // Log the error for debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
