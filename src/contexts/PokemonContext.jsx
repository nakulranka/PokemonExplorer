import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('id');
  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonData = await fetch(pokemon.url).then(res => res.json());
            
            // Fetch species data to get evolution chain
            const speciesData = await fetch(pokemonData.species.url).then(res => res.json());
            const evolutionChainUrl = speciesData.evolution_chain.url;
            const evolutionData = await fetch(evolutionChainUrl).then(res => res.json());

            // Parse evolution chain
            const getEvolutionChain = (chain) => {
              let evolutionChain = [];
              let current = chain;
              while (current) {
                evolutionChain.push(current.species.name);
                current = current.evolves_to[0]; // Assuming single evolution path for simplicity
              }
              return evolutionChain.join(' → ');
            };
            const evolutionChain = getEvolutionChain(evolutionData.chain);

            return { ...pokemonData, evolution_chain: evolutionChain };
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        filteredPokemons,
        setFilteredPokemons,
        loading,
        error,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        sortBy,
        setSortBy,
        filters,
        setFilters,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);