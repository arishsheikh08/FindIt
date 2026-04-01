import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user, token } = useAuth();
  // We'll store a dictionary of productId -> true for O(1) lookups
  const [favoritesDict, setFavoritesDict] = useState({});

  useEffect(() => {
    if (user && token) {
      fetchFavorites();
    } else {
      setFavoritesDict({}); // Clear favorites on logout
    }
  }, [user, token]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/favorites');
      const newDict = {};
      response.data.forEach(fav => {
        newDict[fav.productId] = true;
      });
      setFavoritesDict(newDict);
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  const toggleFavorite = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    const isFavorited = favoritesDict[productId];
    
    // Optimistic UI update
    setFavoritesDict(prev => ({ ...prev, [productId]: !prev[productId] }));

    try {
      if (isFavorited) {
        await axios.delete(`http://localhost:5000/api/favorites/${productId}`);
      } else {
        await axios.post(`http://localhost:5000/api/favorites/${productId}`);
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
      // Revert optimistic update on failure
      setFavoritesDict(prev => ({ ...prev, [productId]: isFavorited }));
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoritesDict, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
