import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(getCartTotal());

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px', background: 'white', borderRadius: '4px', border: '1px solid var(--olx-border)' }}>
        <h2 style={{ color: 'var(--olx-dark)', marginBottom: '16px' }}>Your Cart is empty</h2>
        <p style={{ color: 'var(--olx-text-muted)', marginBottom: '24px' }}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" style={{ padding: '12px 24px', background: 'var(--olx-dark)', color: 'white', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ flex: '2', minWidth: '350px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--olx-dark)', marginBottom: '24px' }}>Shopping Cart</h1>
        <div style={{ background: 'white', border: '1px solid var(--olx-border)', borderRadius: '4px', padding: '0 24px' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', padding: '24px 0', borderBottom: '1px solid var(--olx-bg)', alignItems: 'center' }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'contain', marginRight: '24px' }} />
              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.id}`} style={{ color: 'var(--olx-dark)', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold' }}>{item.name}</Link>
                <p style={{ color: 'var(--olx-text-muted)', fontSize: '14px', marginTop: '4px' }}>Qty: {item.quantity}</p>
                <p style={{ color: 'var(--olx-dark)', fontWeight: 'bold', marginTop: '12px', fontSize: '18px' }}>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)}
                </p>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--olx-text-muted)' }}>
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ flex: '1', minWidth: '300px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '4px', border: '1px solid var(--olx-border)', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--olx-dark)', marginBottom: '24px' }}>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '16px', color: 'var(--olx-text)' }}>
            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
            <span>{formattedTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px', color: 'var(--olx-text)' }}>
            <span>Delivery charges</span>
            <span style={{ color: 'green' }}>FREE</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--olx-border)', marginBottom: '24px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '20px', fontWeight: 'bold', color: 'var(--olx-dark)' }}>
            <span>Total Amount</span>
            <span>{formattedTotal}</span>
          </div>
          <button onClick={() => navigate('/checkout')} style={{ width: '100%', padding: '16px', background: 'var(--olx-dark)', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
