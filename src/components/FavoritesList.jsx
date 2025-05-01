import React, { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import PokemonSmallCard from './PokemonSmallCard';
import PokemonDetail from './PokemonDetail';

const FavoritesList = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < favorites.length; i += 5) {
      const rowPokemons = favorites.slice(i, i + 5);
      rows.push(
        <div key={i} className="favorites-row">
          {rowPokemons.map(pokemon => (
            <PokemonSmallCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setSelectedPokemon(pokemon)}
              onRemove={() => removeFavorite(pokemon.id)}
            />
          ))}
          {rowPokemons.length < 5 && Array.from({ length: 5 - rowPokemons.length }).map((_, index) => (
            <div key={`empty-${i + index}`} className="empty-slot"></div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="favorites-list">
      {favorites.length ? renderRows() : <p>No favorites yet.</p>}
      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default FavoritesList;