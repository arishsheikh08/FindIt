import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MapPin, Calendar, User, Share2, Heart, AlertCircle } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product details.');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ padding: '24px' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '24px' }}>Product not found.</div>;

  const datePosted = new Date(product.createdAt).toLocaleDateString();
  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {/* Left Column */}
      <div style={{ flex: '2', minWidth: '350px' }}>
        <div style={{ background: 'black', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', position: 'relative' }}>
          <img src={product.imageUrl} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
        
        <div style={{ background: 'white', padding: '24px', marginTop: '16px', borderRadius: '4px', border: '1px solid var(--olx-border)' }}>
          <h3 style={{ fontSize: '20px', color: 'var(--olx-dark)', marginBottom: '16px' }}>Description</h3>
          <p style={{ whiteSpace: 'pre-line', color: 'var(--olx-text)' }}>{product.description}</p>
        </div>
      </div>
      
      {/* Right Column */}
      <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ background: 'white', padding: '24px', borderRadius: '4px', border: '1px solid var(--olx-border)', position: 'relative' }}>
          <h1 style={{ fontSize: '32px', color: 'var(--olx-dark)', fontWeight: 'bold', marginBottom: '8px' }}>{formattedPrice}</h1>
          <p style={{ fontSize: '16px', color: 'var(--olx-text-muted)', marginBottom: '16px', lineHeight: '1.4' }}>{product.name}</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--olx-text-muted)', marginTop: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14}/> {product.location || 'India'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> {datePosted}</span>
          </div>

          <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '12px' }}>
            <Share2 size={24} color="var(--olx-dark)" cursor="pointer" />
            <Heart size={24} color="var(--olx-dark)" cursor="pointer" />
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '24px', borderRadius: '4px', border: '1px solid var(--olx-border)' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--olx-dark)', marginBottom: '16px' }}>Seller description</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={24} color="white" />
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: 'var(--olx-dark)' }}>Verified Seller</p>
              <p style={{ fontSize: '12px', color: 'var(--olx-text-muted)' }}>Member since ancient times</p>
            </div>
          </div>
          <button onClick={handleBuyNow} style={{ width: '100%', padding: '14px', background: 'var(--olx-dark)', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '12px' }}>BUY NOW</button>
          <button onClick={handleAddToCart} style={{ width: '100%', padding: '14px', background: 'white', color: 'var(--olx-dark)', border: '2px solid var(--olx-dark)', fontWeight: 'bold', fontSize: '16px', borderRadius: '4px', cursor: 'pointer' }}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
