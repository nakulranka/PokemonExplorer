import React from 'react';
import { useComparison } from '../hooks/useComparison';
import { usePokemon } from '../contexts/PokemonContext';

const ComparisonTool = () => {
  const { pokemons } = usePokemon();
  const { pokemon1, pokemon2, selectPokemon1, selectPokemon2, comparisonData } = useComparison();

  return (
    <div className="comparison-tool">
      <select onChange={(e) => selectPokemon1(e.target.value)}>
        <option value="">Select Pokémon 1</option>
        {pokemons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select onChange={(e) => selectPokemon2(e.target.value)}>
        <option value="">Select Pokémon 2</option>
        {pokemons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      {comparisonData && (
        <div>
          {comparisonData.stats.map(stat => (
            <p key={stat.name}>{stat.name}: {stat.value1} vs {stat.value2}</p>
          ))}
        </div>
      )}
      <style>{/* Same as before */}</style>
    </div>
  );
};

export default ComparisonTool;