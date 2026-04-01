require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/database');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const chatbotRouter = require('./routes/chatbot');
const { router: authRouter } = require('./routes/auth');
const favoritesRouter = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/chat', chatbotRouter);
app.use('/api/favorites', favoritesRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
