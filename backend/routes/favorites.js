const express = require('express');
const { Favorite, Product } = require('../models/database');
const { protect } = require('./auth');

const router = express.Router();

// Get user's favorites
router.get('/', protect, async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ 
      where: { userId: req.user.id },
      include: [Product]
    });
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add a favorite
router.post('/:productId', protect, async (req, res) => {
  try {
    const existing = await Favorite.findOne({
      where: { userId: req.user.id, productId: req.params.productId }
    });
    if (!existing) {
      await Favorite.create({ userId: req.user.id, productId: req.params.productId });
    }
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// Remove a favorite
router.delete('/:productId', protect, async (req, res) => {
  try {
    await Favorite.destroy({ 
      where: { userId: req.user.id, productId: req.params.productId } 
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

module.exports = router;
