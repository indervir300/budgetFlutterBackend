const express = require('express');
const status = express.Router();
const User = require('../models/userSchema');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

status.get('/', async (req, res) => {
  const tokenSecret = process.env.JWT_TOKEN_SECRET;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // No token, redirect to login
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, tokenSecret);
    const userId = decoded.userId;

    const fetchUser = await User.findOne({ _id: userId });
    if (fetchUser) {
      const { name } = fetchUser;
      const payload = { username: name };
      const newToken = jwt.sign(payload, tokenSecret, { expiresIn: '10h' });
      res.send(newToken);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Session Expired' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

module.exports = status;