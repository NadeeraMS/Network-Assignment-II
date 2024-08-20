const express = require('express');
const router = express.Router();
const Account = require('../models/account'); 

// Define the validation function
const isValidAccountNumber = (accountNumber) => {
    return /^\d{10}$/.test(accountNumber); // Account number should be a 10-digit number
};

router.post('/transfer', async (req, res) => {
    try {
        const { sourceAccountNumber, destinationAccountNumber, amount } = req.body;

        // Validate account numbers
        if (!isValidAccountNumber(sourceAccountNumber) || !isValidAccountNumber(destinationAccountNumber)) {
            return res.status(400).json({ error: "Invalid account number" });
        }

        // Fetch accounts from the database
        const sourceAccount = await Account.findOne({ where: { accountNumber: sourceAccountNumber } });
        const destinationAccount = await Account.findOne({ where: { accountNumber: destinationAccountNumber } });

        if (!sourceAccount || !destinationAccount) {
            return res.status(404).json({ error: "One or both accounts not found" });
        }

        // Implement transfer logic here
        if (sourceAccount.balance < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }

        // Perform the transfer
        sourceAccount.balance -= amount;
        destinationAccount.balance += amount;

        await sourceAccount.save();
        await destinationAccount.save();

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        console.error("Transfer failed:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
