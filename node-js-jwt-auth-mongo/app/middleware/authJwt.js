const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({
        message: 'Token not found!'
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized login!' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


const authJwt = {
  verifyToken,
};
module.exports = authJwt;
