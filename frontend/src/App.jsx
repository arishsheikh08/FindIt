import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Plus, ShoppingCart, MessageSquare, Store, MapPin, Heart } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

import Home from './pages/Home';
import Sell from './pages/Sell';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import Chatbot from './components/Chatbot';

const Header = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [showLocation, setShowLocation] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [locationName, setLocationName] = useState('India');

  const popularLocations = ['India', 'Mumbai, Maharashtra', 'Delhi', 'Bengaluru, Karnataka', 'Hyderabad, Telangana'];
  const categoriesList = ['Cars', 'Motorcycles', 'Mobiles', 'Properties', 'Furniture', 'Electronics & Appliances', 'Fashion'];

  return (
    <header className="app-header">
      <div className="header-top">
        <Link to="/" className="logo">FindIt</Link>
        
        <div className="location-picker" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowLocation(!showLocation)}>
          <Search size={20} color="var(--olx-dark)" />
          <input 
            type="text" 
            placeholder="Search city, area or local" 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)}
            style={{ pointerEvents: 'none' }}
          />
          <ChevronDown size={24} color="var(--olx-dark)" />
          
          {showLocation && (
            <div className="dropdown-menu">
              <div style={{ padding: '8px 16px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>POPULAR LOCATIONS</div>
              {popularLocations.map((loc, idx) => (
                <div key={idx} className="dropdown-item" onClick={() => setLocationName(loc)}>
                  <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> {loc}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <form onSubmit={handleSearch} className="search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Find Cars, Mobile Phones and more..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="search-btn">
            <Search size={24} color="var(--white)" />
          </button>
        </form>

        <Link to="/favorites" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'var(--olx-dark)' }}>
          <Heart size={28} />
        </Link>

        <Link to="/cart" style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--olx-dark)' }}>
          <ShoppingCart size={28} />
          {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--olx-cyan)', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>{cartCount}</span>}
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: 'bold', borderBottom: '2px solid transparent' }} className="hidden-mobile">Hi, {user.name.split(' ')[0]}</span>
            <button onClick={logout} className="login-btn hidden-mobile" style={{ textDecoration: 'none' }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-btn hidden-mobile" style={{ textDecoration: 'none' }}>Login</Link>
        )}

        <Link to="/sell" style={{ textDecoration: 'none' }}>
          <div className="sell-btn-wrapper">
            <Plus size={18} strokeWidth={3} color="var(--olx-dark)" />
            <span className="sell-btn-text">SELL</span>
          </div>
        </Link>
      </div>
      
      {/* Categories Bar */}
      <div className="categories-bar" style={{ marginTop: '12px' }}>
        <div className="categories-content">
          <div 
            className="all-categories" 
            style={{ position: 'relative' }} 
            onMouseLeave={() => setShowCategories(false)}
          >
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              onMouseEnter={() => setShowCategories(true)}
              onClick={() => setShowCategories(!showCategories)}
            >
              ALL CATEGORIES <ChevronDown size={20} />
            </div>
            
            {showCategories && (
              <div className="dropdown-menu" style={{ width: '250px' }}>
                {categoriesList.map(cat => (
                  <Link key={cat} to={`/category/${cat}`} className="dropdown-item" onClick={() => setShowCategories(false)}>
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {categoriesList.slice(0, 5).map(cat => (
            <Link key={cat} to={`/category/${cat}`} className="category-link hidden-mobile">{cat}</Link>
          ))}
        </div>
      </div>
    </header>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router>
            <div className="app-container">
              <Routes>
                <Route path="*" element={
                  <>
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={(e) => {
                      e.preventDefault();
                      window.location.href = `/?search=${searchTerm}`;
                    }} />
                    
                    <main className="main-container">
                      <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/category/:categoryName" element={<Category />} />
                        <Route path="/sell" element={<Sell />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/favorites" element={<Favorites />} />
                      </Routes>
                    </main>
                    <Chatbot />
                  </>
                } />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
