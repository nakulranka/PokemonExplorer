import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Pokémon list
        const pokemonRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!pokemonRes.ok) throw new Error('Failed to fetch Pokémon');
        const pokemonData = await pokemonRes.json();
        const pokemonDetails = await Promise.all(
          pokemonData.results.map(async (p) => {
            const res = await fetch(p.url);
            if (!res.ok) throw new Error(`Failed to fetch ${p.name}`);
            return res.json();
          })
        );
        setPokemonList(pokemonDetails);

        // Fetch types
        const typesRes = await fetch('https://pokeapi.co/api/v2/type');
        if (!typesRes.ok) throw new Error('Failed to fetch types');
        const typesData = await typesRes.json();
        setTypes(typesData.results.map(t => t.name));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || pokemon.types.some(t => t.type.name === selectedType);
    return matchesName && matchesType;
  });

  return (
    <div className="app">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={types}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        filteredPokemon.length > 0 ? (
          <PokemonList pokemon={filteredPokemon} />
        ) : (
          <EmptyState />
        )
      )}
    </div>
  );
}

export default App;