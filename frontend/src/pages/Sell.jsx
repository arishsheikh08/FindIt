import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Mobiles',
    location: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/products', formData);
      navigate(`/product/${response.data.id}`);
    } catch (err) {
      alert("Failed to post ad.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '32px', borderRadius: '8px', border: '1px solid var(--olx-border)' }}>
      <h1 style={{ marginBottom: '24px', color: 'var(--olx-dark)' }}>Post your ad</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Ad Title *</label>
          <input required name="name" value={formData.name} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Mention the key features of your item (e.g. brand, model, age, type)" />
        </div>
        
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Description *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Include condition, features and reason for selling" />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Price (₹) *</label>
          <input required name="price" value={formData.price} onChange={handleChange} type="number" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Mobiles">Mobiles</option>
            <option value="Cars">Cars</option>
            <option value="Motorcycles">Motorcycles</option>
            <option value="Properties">Properties</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics & Appliances">Electronics & Appliances</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Location *</label>
          <input required name="location" value={formData.location} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Neighborhood, City" />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Image URL</label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} type="url" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="https://..." />
        </div>

        <button type="submit" disabled={loading} style={{ background: 'var(--olx-dark)', color: 'white', padding: '16px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px' }}>
          {loading ? 'Posting...' : 'Post now'}
        </button>
      </form>
    </div>
  );
};

export default Sell;
