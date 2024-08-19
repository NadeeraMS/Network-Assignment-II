const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const Transaction = require('../models/transaction');
const sequelize = require('../config/db');

router.post('/transfer', async (req, res) => {
  const { sourceAccountNumber, destinationAccountNumber, amount } = req.body;

  try {
    const sourceAccount = await Account.findByPk(sourceAccountNumber);
    const destinationAccount = await Account.findByPk(destinationAccountNumber);

    if (!sourceAccount || !destinationAccount) {
      return res.status(404).json({ error: 'Invalid account number' });
    }

    if (sourceAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Perform the transfer within a transaction
    await sequelize.transaction(async (t) => {
      sourceAccount.balance -= amount;
      destinationAccount.balance += amount;

      await sourceAccount.save({ transaction: t });
      await destinationAccount.save({ transaction: t });

      await Transaction.create({
        sourceAccountNumber,
        destinationAccountNumber,
        amount,
      }, { transaction: t });
    });

    res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error('Transfer failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
