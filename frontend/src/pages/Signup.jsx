import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', background: 'white', border: '1px solid var(--olx-border)', borderRadius: '4px' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--olx-dark)' }}>Create an Account</h2>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
          required 
        />
        <input 
          type="email" 
          placeholder="Email address" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
          required 
        />
        <button type="submit" style={{ padding: '14px', background: 'var(--olx-dark)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--olx-cyan)', fontWeight: 'bold', textDecoration: 'none' }}>Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
