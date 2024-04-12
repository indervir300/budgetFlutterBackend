const mongoose = require('mongoose');

payments = new mongoose.Schema({
    userId: {
      type: String, required: true
    },
  title: {
    type: String, required: true
  },
  amount: {
    type: Number, required: true
  },
  createdAt: {
    type: Date, default: Date.now,
  },
  paymentType: {
	type: String, required: true
  }, 
  transactionType: {
	  type: String, required: true
  }
});

module.exports = mongoose.model('Payments', payments);