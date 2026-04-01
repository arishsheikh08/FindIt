# FindIt - Full-Stack E-Commerce Marketplace

FindIt is a modern, fully-responsive, classifieds-style e-commerce platform inspired by OLX. It allows users to browse products, register accounts, post their own advertisements, save items to their persistent wishlist, and seamlessly add items to a shopping cart to checkout. It is supercharged with a sophisticated Google Gemini AI chatbot that provides real-time intelligent assistance based on the store's dynamic product catalog.

## ✨ Features

- **Full User Authentication:** Secure Login and Registration pipeline using `bcrypt` password hashing and JWT (JSON Web Tokens).
- **Sell/Post Ads:** Authenticated users can dynamically post new product listings bridging images, descriptions, categories, and localization.
- **Persistent Wishlist (Favorites):** Database-backed user favorites system allowing shoppers to save and retrieve their curated items across sessions.
- **Cart & Checkout Engine:** A robust global context managing shopping cart state, real-time summation, and a smooth checkout form.
- **Smart AI Assistant:** Integrated internal Chatbot via `@google/generative-ai` acting as a 24/7 store concierge.
- **Fully Responsive UI:** Carefully crafted custom CSS ensuring picture-perfect layouts spanning from widescreen desktop monitors to mobile phone screens. 

## 🛠️ Tech Stack

**Frontend:**
- [React](https://reactjs.org/) (bootstrapped with Vite)
- [React Router DOM](https://reactrouter.com/) (Multi-page routing)
- Context API (Global state management)
- Vanilla CSS (Custom OLX-inspired design system)
- [Lucide React](https://lucide.dev/) (Iconography)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) (RESTful APIs)
- [Sequelize](https://sequelize.org/) ORM
- [SQLite](https://www.sqlite.org/) (Zero-configuration database)
- JSON Web Tokens (JWT) & bcryptjs (Encryption + Auth) 

**AI Integration:**
- [Google Gemini API](https://deepmind.google/technologies/gemini/)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine. You will also need a free **Google Gemini API Key**.

### 1. Clone the repository
```bash
git clone https://github.com/arishsheikh08/FindIt.git
cd FindIt
```

### 2. Backend Setup
Navigate into the backend directory, install dependencies, configure the environment, and seed the database.

```bash
cd backend
npm install

# Create an environment file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
echo "JWT_SECRET=super_secret_key" >> .env
echo "PORT=5000" >> .env

# Initialize and Seed the Database
node seed.js

# Start the Backend Server
node server.js
```
The server will start running on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend
npm install

# Start the React Vite Development Server
npm run dev
```

The frontend will be available at `http://localhost:5173`. 

## 📖 Application Flow

1. **Browsing**: Visitors can search for products, filter by categories in the top navigation ribbon, or use the dynamic location dropdown.
2. **AI Chatbot**: Open the floating chat widget on the bottom right to ask intelligent conversational questions about the active inventory.
3. **Register / Login**: Click "Login" in the header to create an account.
4. **Wishlist**: Click the heart icon on any product to save it to your Database `Favorites`, accessible via the top-right heart icon. 
5. **Selling**: Authenticated users can click `+ SELL` to publish a live advertisement.
6. **Checkout**: Add items to your cart and proceed to the checkout screen to finalize mock purchases. 
