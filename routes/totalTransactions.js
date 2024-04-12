const express = require('express')
const route = express.Router()
const Payment = require('../models/paymentsSchema')

async function getTotalTransactions(userId) {
  try {
    const count = await Payment.countDocuments({ userId });
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

route.get('/:userId', async(req, res) => {
const { userId } = req.params;
getTotalTransactions(userId)
  .then(count => {
   // console.log(`Total transactions for user ${userId}: ${count}`);
	res.status(200).json({ totalTransactions: count });
  })
  .catch(error => {
    console.error('Error fetching transaction count:', error);
});
	
});

module.exports = route;