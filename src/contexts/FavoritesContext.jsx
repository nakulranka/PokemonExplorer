import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage, or use an empty array if none exist
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites(prev => {
      // Avoid duplicates by checking if the Pokémon ID already exists
      if (!prev.some(fav => fav.id === pokemon.id)) {
        return [...prev, pokemon];
      }
      return prev;
    });
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(pokemon => pokemon.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(pokemon => pokemon.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};