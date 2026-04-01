import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Favorites = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites');
        // Filter out null Products (just in case) and map to the inner Product object
        const favoritedProducts = res.data.map(fav => fav.Product).filter(p => p !== null);
        setProducts(favoritedProducts);
      } catch (err) {
        console.error("Failed to load wishlist");
      }
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: '24px', background: 'white', borderRadius: '4px', border: '1px solid var(--olx-border)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--olx-dark)' }}>Your Wishlist</h2>
      {loading ? (
        <p>Loading your favorite items...</p>
      ) : (
        products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div style={{ padding: '48px 0', textAlign: 'center' }}>
            <p style={{ color: 'var(--olx-text-muted)', marginBottom: '16px' }}>You haven't added anything to your wishlist yet.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Favorites;
