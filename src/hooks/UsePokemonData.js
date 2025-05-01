import { useState, useEffect, useCallback, useMemo } from 'react';
import { useApi } from '../services/api';

export function usePokemonData() {
  const { fetchPokemonList, fetchPokemonDetails } = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchPokemonList(151);
      const details = await Promise.all(list.map(p => fetchPokemonDetails(p.id)));
      setData(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchPokemonList, fetchPokemonDetails]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, loading, error, refetch: fetchData };
}