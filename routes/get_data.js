const express = require('express')
const user_data = express.Router()
const User = require('../models/userSchema')
const dotenv = require('dotenv')
const moment = require('moment');
const jwt = require('jsonwebtoken')
dotenv.config()

user_data.post('/', async (req, res) => {
    const tokenSecret = process.env.JWT_TOKEN_SECRET;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, tokenSecret);
        const userId = decoded.userId;
        const data = await User.findOne({ _id: userId });
        if (!data) {
            return res.status(401).json({ message: 'Error checking user details' });
        }
        const { _id, name, email, createdAt } = data;
        const userIdValue = _id.toString();
        const date = moment(createdAt).format('DD MMM YYYY');
        res.json({ userId: userIdValue, name, email, createdAt: date });
    } catch (err) {
        return res.status(401).json({ message: 'Something went wrong!!' });
    }
});
module.exports = user_data;