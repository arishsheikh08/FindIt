const express = require('express');
const { Product } = require('../models/database');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      return res.json({ reply: "To use the real AI, please add your Google Gemini API key to the `backend/.env` file. \n\nGet one for free at: https://aistudio.google.com/app/apikey" });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Fetch the product catalog to give the AI context about the store
    const products = await Product.findAll();
    const productList = products.map(p => `- ${p.name} ($${p.price.toFixed(2)}) [Category: ${p.category}]: ${p.description}`).join('\n');

    // System instruction to guide the AI's behavior
    const systemInstruction = `You are a helpful and polite AI shopping assistant for our e-commerce store. 
Here is our current product catalog:
${productList}

Assist the user by answering questions about our products, recommending items based on their queries, and helping them navigate. If they ask for something we don't have, politely inform them. Keep your responses concise and friendly.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction 
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();
    
    res.json({ reply });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI Chatbot encountered an error: ' + error.message });
  }
});

module.exports = router;
