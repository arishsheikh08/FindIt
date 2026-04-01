const express = require('express');
const { Op } = require('sequelize');
const { Product } = require('../models/database');

const router = express.Router();

// Get all products or search
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }
    if (category) {
      whereClause.category = category;
    }

    const products = await Product.findAll({ where: whereClause });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

const { protect } = require('./auth');

// Create a new product
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, location } = req.body;
    const newProduct = await Product.create({
      name, 
      description, 
      price, 
      imageUrl: imageUrl || 'https://via.placeholder.com/500?text=No+Image', 
      category, 
      location,
      userId: req.user.id
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

module.exports = router;
