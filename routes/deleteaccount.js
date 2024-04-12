const express = require('express');
const deleteRoute = express.Router();
const PaymentsSchema = require('../models/paymentsSchema');
const UserSchema = require('../models/userSchema');

deleteRoute.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await UserSchema.deleteOne({ _id: userId });
    if (deletedUser.deletedCount !== 1) {
      return res.status(404).send({ message: 'User not found' });
    }

    const deletedPaymentsCount = await PaymentsSchema.deleteMany({ userId });
    if (deletedPaymentsCount.deletedCount > 0) {
      console.log(`Deleted ${deletedPaymentsCount.deletedCount} payments for user ${userId}`);
    }

    res.status(204).send('Account Permanently Deleted 😥');
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).send({ message: 'Error deleting user account!' });
  }
});

module.exports = deleteRoute;