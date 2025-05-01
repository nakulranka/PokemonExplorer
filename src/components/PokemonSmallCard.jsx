import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

const PokemonSmallCard = ({ pokemon, onClick }) => {
  const { removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite ? isFavorite(pokemon.id) : false;

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    removeFavorite(pokemon.id);
  };

  return (
    <div className="pokemon-small-card" onClick={onClick} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && onClick()}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        loading="lazy"
      />
      <div className="small-card-info">
        <h4>{pokemon.name}</h4>
        <p>#{pokemon.id}</p>
        <button onClick={handleRemoveFavorite}>Remove</button>
      </div>
    </div>
  );
};

export default PokemonSmallCard;