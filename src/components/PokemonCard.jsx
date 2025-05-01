import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

const PokemonCard = ({ pokemon, onClick }) => {
  const { addFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite ? isFavorite(pokemon.id) : false;

  const handleAddFavorite = (e) => {
    e.stopPropagation();
    if (!favorite) {
      addFavorite(pokemon);
    }
  };

  return (
    <div className="pokemon-card" onClick={onClick} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && onClick()}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} loading="lazy" />
      <h3>{pokemon.name}</h3>
      <p>#{pokemon.id}</p>
      <div className="type-tags">
        {pokemon.types.map((type, index) => (
          <span key={index} className={`type-tag type-${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
      <button onClick={handleAddFavorite} disabled={favorite}>
        {favorite ? 'Added' : 'Add Favorite'}
      </button>
    </div>
  );
};

export default PokemonCard;