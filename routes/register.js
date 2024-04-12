const express = require('express');
const reg = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

const userDetails = async (userName, emailAddress, userPassword) => {
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(userPassword, salt);

    const newUser = new User({
        name: userName,
        email: emailAddress,
        password: hashPassword
    });
    return newUser.save();
}

reg.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required 🙄' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Ohh! Account already registered 🤔" });
        }
        const user = await userDetails(name, email, password);
        res.status(201).json({
             message: 'Hey! ' + user.name.charAt(0).toUpperCase() + user.name.slice(1) + ' 😎', user: user 
        });

    } catch (err) {
        console.log(`Error in checking account status `, err);
        res.status(500).json({ message: "Error creating user" });
    }

});

module.exports = reg;