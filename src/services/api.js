import { useCallback } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const useApi = () => {
  const fetchWithBatching = useCallback(async (urls) => {
    try {
      const responses = await Promise.all(
        urls.map(url =>
          fetch(url, { mode: 'cors' }).then(res => {
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            return res.json();
          })
        )
      );
      return responses;
    } catch (error) {
      console.error('Batch Fetch Error:', error);
      throw error;
    }
  }, []);

  const fetchPokemonList = useCallback(async (limit = 151) => {
    const url = `${BASE_URL}/pokemon?limit=${limit}`;
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Fetch Pokémon List Error:', error);
      throw error;
    }
  }, []);

  const fetchPokemonDetails = useCallback(async (id) => {
    const url = `${BASE_URL}/pokemon/${id}`;
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch Pokémon Details (${id}) Error:`, error);
      throw error;
    }
  }, []);

  return { fetchPokemonList, fetchPokemonDetails, fetchWithBatching };
};