const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Account = require('../models/account');  // Assuming the model is in models/account.js

// Endpoint to create a new account
router.post('/create-account', async (req, res) => {
    try {
        const { accountNumber, balance } = req.body;

        // Validate account number
        if (!/^\d{10}$/.test(accountNumber)) {
            return res.status(400).json({ error: "Invalid account number" });
        }

        // Create a new account
        const newAccount = await Account.create({
            accountNumber,
            balance
        });

        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
        console.error("Account creation failed:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
