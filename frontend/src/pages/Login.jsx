import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', background: 'white', border: '1px solid var(--olx-border)', borderRadius: '4px' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--olx-dark)' }}>Login to Continue</h2>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          Log In
        </button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--olx-cyan)', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
