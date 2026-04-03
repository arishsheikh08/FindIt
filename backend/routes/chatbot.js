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
    const catalogText = products.map(p => `- ${p.name} ($${p.price.toFixed(2)}) [Category: ${p.category}]: ${p.description}`).join('\n');

    const prompt = `You are the enthusiastic, persuasive, and highly professional AI Concierge for 'FindIt', a premium e-commerce platform!
Your sole purpose is to assist the user, drive sales, and convincingly recommend the products we have in our inventory. 
Always maintain a bright, trustworthy, and engaging tone. Use emojis naturally. Do not sound robotic. 

Here is the LIVE catalog of products currently available on FindIt:
---
${catalogText}
---

The user is saying: "${message}"

If the user asks for recommendations, heavily highlight the best features of the available products and tell them WHY it's a great deal! If the user asks about something we don't have, politely steer them toward what we DO have. 
Format your responses using clean Markdown paragraphs and bullet points for readability. Be persuasive, helpful, and concise!`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();
    
    res.json({ reply });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI Chatbot encountered an error: ' + error.message });
  }
});

module.exports = router;
