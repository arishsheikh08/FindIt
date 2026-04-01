import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: ''
  });

  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(getCartTotal());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app we would send the cart items too. Right now order table just takes name and amount
      await axios.post('http://localhost:5000/api/orders', {
        customerName: formData.name,
        totalAmount: getCartTotal()
      });
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to place order.');
    }
    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '32px', borderRadius: '4px', border: '1px solid var(--olx-border)' }}>
      <h1 style={{ fontSize: '24px', color: 'var(--olx-dark)', marginBottom: '24px' }}>Checkout</h1>
      <div style={{ marginBottom: '32px', padding: '16px', background: 'var(--olx-bg)', borderRadius: '4px' }}>
        <h3 style={{ marginBottom: '8px' }}>Total to pay: {formattedTotal}</h3>
        <p style={{ color: 'var(--olx-text-muted)' }}>{cartItems.length} items</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Full Name *</label>
          <input required type="text" name="name" onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email Address *</label>
          <input required type="email" name="email" onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Phone Number *</label>
          <input required type="tel" name="phone" onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Delivery Address *</label>
          <textarea required name="address" onChange={handleChange} rows="3" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        
        <button type="submit" disabled={loading} style={{ background: 'var(--olx-dark)', color: 'white', padding: '16px', border: 'none', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px' }}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
