import { useState, useEffect } from 'react';
import { useStorage } from '../services/storage';

export function useFavorites() {
  const { loadFavorites, saveFavorites } = useStorage();
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = (pokemon) => setFavorites((prev) => [...new Set([...prev, pokemon])]);
  const removeFavorite = (pokemon) => setFavorites((prev) => prev.filter(p => p.id !== pokemon.id));

  return { favorites, addFavorite, removeFavorite };
}