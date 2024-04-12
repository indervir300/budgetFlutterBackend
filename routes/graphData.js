const express = require('express')
const graph = express.Router()
const PaymentSchema = require('../models/paymentsSchema');

const graphdata = async (userId) => {
  console.log(userId);
  try {
    const data = await PaymentSchema.find({ userId: userId });
    const count = data.length;
    const amounts = data.map((graph) => graph.transactionType === 'paid' ? -graph.amount : graph.amount);
    return { count, amounts };
  } catch (err) {
    throw err;
  }
}

graph.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('UserId for graph data is ' + userId)
  graphdata(userId).then(data => {
    console.log(data)
    res.status(200).json({ count: data.count, amounts: data.amounts });
  }).catch(err => {
    console.error('Error fetching transaction count:', error);
  })
})

module.exports = graph;