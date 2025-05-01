const STORAGE_KEY = 'pokemonFavorites';

export const useStorage = () => {
  const saveFavorites = (favorites) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Storage Error:', error);
    }
  };

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Storage Error:', error);
      return [];
    }
  };

  const clearFavorites = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Storage Error:', error);
    }
  };

  return { saveFavorites, loadFavorites, clearFavorites };
};