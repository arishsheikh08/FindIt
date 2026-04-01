import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5000/api/products${searchQuery ? `?search=${searchQuery}` : ''}`;
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div>
      <h2 className="section-title">
        {searchQuery ? `Search results for "${searchQuery}"` : 'Fresh recommendations'}
      </h2>
      
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Home;
