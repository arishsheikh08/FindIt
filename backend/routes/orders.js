const express = require('express');
const { Order } = require('../models/database');

const router = express.Router();

// Create an order
router.post('/', async (req, res) => {
  try {
    const { customerName, totalAmount } = req.body;
    const order = await Order.create({ customerName, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (for admin/demo purposes)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
