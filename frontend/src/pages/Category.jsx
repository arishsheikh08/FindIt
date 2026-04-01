import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products?category=${categoryName}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div>
      <h2 className="section-title">
        {categoryName} for Sale
      </h2>
      
      {loading ? (
        <p>Loading {categoryName}...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Category;
