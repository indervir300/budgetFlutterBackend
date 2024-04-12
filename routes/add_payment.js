const express = require('express')
const add_payment = express.Router()
const User = require('../models/userSchema')
const paymentSchema = require('../models/paymentsSchema');

const StorePaymentDB = async (userId, title, amount, paymentType, transactionType) => {
    const newPayment = new paymentSchema({
        userId: userId,
        title: title,
        amount: amount,
		paymentType: paymentType,
		transactionType: transactionType
    });
    return newPayment.save();
}

const storePayment = async (req, res) => {
	const paymentType = req.route.path.split('/')[1];
    try {
        const { userId, title, amount, transactionType} = req.body;
        const user_id = await User.findOne({ _id: userId });
        if (!user_id) {
            return res.status(401).json({ message: 'No user found!' });
        }

        const data = await StorePaymentDB(userId, title, amount, paymentType, transactionType);
        res.status(200).json({ message: 'Payment added successfully!', data });
    } catch (error) {
        console.log(`Something went wrong `);
        res.status(500).json({ message: "Something went wrong!!" });
    }
}

add_payment.post('/donation', storePayment);
add_payment.post('/housepayments', storePayment);
add_payment.post('/shopping', storePayment);
add_payment.post('/education', storePayment);
add_payment.post('/business', storePayment);

module.exports = add_payment;