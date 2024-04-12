const express = require('express')
const bcrypt = require('bcrypt')
const login = express.Router()
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

login.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password required! 🙄🙄' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email or Password incorrect 😝' });
        }
        const isRightPass = await bcrypt.compare(password, user.password);
        if (!isRightPass) {
            return res.status(401).json({ message: 'Email or Password incorrect 😝' });
        }
        const payLoad = { userId: user._id };
        const jsontokenSecret = 'budgettrackerproject';
        const jwtToken = jwt.sign(payLoad, jsontokenSecret, { expiresIn: '10h' });
        return res.status(200).json({ message: `Welcome ${user.name} 🤗`, jwtToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error!!' });
    }
});

module.exports = login;