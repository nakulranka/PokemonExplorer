import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}

export default PokemonList;