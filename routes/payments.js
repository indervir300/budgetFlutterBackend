const express = require('express');
const payment_route = express.Router();
const paymentsSchema = require('../models/paymentsSchema');
const moment = require('moment');

const getPayments = async (req, res) => {
  const userId = req.params.userId;
  const collectionName = req.route.path.split('/')[1];

  try {
    const payments = await paymentsSchema.find({
      userId: userId, paymentType: collectionName
    }).sort({ createdAt: -1 });

    if (!payments) {
      return res.status(404).json({ message: 'Payments not found' });
    }

    const formattedPayments = payments
      .map((payment) => {
        const formattedDate = moment(payment.createdAt).format('DD/MM/YY h:mma');
        return {
          title: payment.title,
          amount: payment.amount,
          formattedDate,
          transactionType: payment.transactionType
        };
      })
      .sort((a, b) => moment(b.createdAt).isBefore(moment(a.createdAt)) ? -1 : 1);

    res.status(200).json({ payments: formattedPayments });
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

payment_route.get('/housepayments/:userId', getPayments);
payment_route.get('/donation/:userId', getPayments);
payment_route.get('/shopping/:userId', getPayments);
payment_route.get('/education/:userId', getPayments);
payment_route.get('/business/:userId', getPayments);

module.exports = payment_route;