import React from 'react';

const PokemonDetail = ({ pokemon, onClose }) => {
  const stats = pokemon.stats
    .map(stat => `${stat.stat.name}: ${stat.base_stat}`)
    .join(', ')
    .replace('special-attack', 'special-attack')
    .replace('special-defense', 'special-defense');

  const abilities = pokemon.abilities
    .map(ability => ability.ability.name)
    .join(', ');

  const moves = pokemon.moves
    .slice(0, 5)
    .map(move => move.move.name)
    .join(', ');

  const evolutionChain = pokemon.evolution_chain || 'Not available';

  return (
    <div className="pokemon-detail-overlay">
      <div className="pokemon-detail">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div>Stats: {stats}</div>
        <div>Abilities: {abilities}</div>
        <div>Moves: {moves}</div>
        <div>Evolution Chain: {evolutionChain}</div>
        <button onClick={onClose} className="back-button">
          Back to List
        </button>
      </div>
    </div>
  );
};

export default PokemonDetail;