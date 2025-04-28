function PokemonCard({ pokemon }) {
    return (
      <div className="pokemon-card">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h3>{pokemon.name}</h3>
        <p>#{pokemon.id}</p>
        <div className="type-tags">
          {pokemon.types.map(t => (
            <span
              key={t.type.name}
              className={`type-tag type-${t.type.name}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default PokemonCard;