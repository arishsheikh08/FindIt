import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const ProductList = ({ products }) => {
  const { favoritesDict, toggleFavorite } = useFavorites();

  if (!products || products.length === 0) {
    return <p>No recommendations found.</p>;
  }



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="products-grid">
      {products.map(product => {
        // Mock a date based on the product creation or random if not present
        const datePosted = new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return (
          <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                >
                  <Heart 
                    size={20} 
                    color="var(--olx-dark)" 
                    fill={favoritesDict[product.id] ? "currentColor" : "none"} 
                  />
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-price">{formatPrice(product.price)}</h3>
                <p className="product-title">{product.name}</p>
                
                <div className="product-footer">
                  <span>{product.location || 'India'}</span>
                  <span>{datePosted.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
