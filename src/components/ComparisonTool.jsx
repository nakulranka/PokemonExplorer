import React, { useState, useEffect } from 'react';
import { usePokemon } from '../contexts/PokemonContext';

const ComparisonTool = () => {
  const { pokemons } = usePokemon();
  const [pokemon1Input, setPokemon1Input] = useState('');
  const [pokemon2Input, setPokemon2Input] = useState('');
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [comparison, setComparison] = useState(null);

  const handleInputChange = (input, setInput, setPokemon, setSuggestions) => {
    const value = input.toLowerCase();
    setInput(value);
    if (value.length > 0) {
      const filtered = pokemons
        .filter(p => p.name.toLowerCase().startsWith(value))
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setPokemon('');
    }
  };

  const handleSuggestionClick = (pokemonName, setInput, setPokemon, setSuggestions) => {
    setInput(pokemonName);
    setPokemon(pokemonName);
    setSuggestions([]);
  };

  useEffect(() => {
    if (pokemon1 && pokemon2) {
      const p1 = pokemons.find(p => p.name === pokemon1);
      const p2 = pokemons.find(p => p.name === pokemon2);
      if (p1 && p2) {
        setComparison({
          name1: p1.name,
          sprite1: p1.sprites.front_default,
          stats1: p1.stats,
          name2: p2.name,
          sprite2: p2.sprites.front_default,
          stats2: p2.stats
        });
      } else {
        setComparison(null);
      }
    } else {
      setComparison(null);
    }
  }, [pokemon1, pokemon2, pokemons]);

  const statLabels = {
    0: 'HP',
    1: 'Attack',
    2: 'Defense',
    3: 'Special Attack',
    4: 'Special Defense',
    5: 'Speed'
  };

  return (
    <div className="comparison-tool">
      <h2>Compare Pokémon</h2>
      <div className="comparison-selects">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Pokémon 1..."
            value={pokemon1Input}
            onChange={(e) => handleInputChange(e.target.value, setPokemon1Input, setPokemon1, setSuggestions1)}
            aria-label="Search Pokémon 1"
          />
          {suggestions1.length > 0 && (
            <ul className="suggestions-list">
              {suggestions1.map(p => (
                <li
                  key={p.id}
                  onClick={() => handleSuggestionClick(p.name, setPokemon1Input, setPokemon1, setSuggestions1)}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Pokémon 2..."
            value={pokemon2Input}
            onChange={(e) => handleInputChange(e.target.value, setPokemon2Input, setPokemon2, setSuggestions2)}
            aria-label="Search Pokémon 2"
          />
          {suggestions2.length > 0 && (
            <ul className="suggestions-list">
              {suggestions2.map(p => (
                <li
                  key={p.id}
                  onClick={() => handleSuggestionClick(p.name, setPokemon2Input, setPokemon2, setSuggestions2)}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {comparison && (
        <div className="comparison-result">
          <div className="comparison-card">
            <img src={comparison.sprite1} alt={comparison.name1} className="comparison-image" />
            <div className="comparison-details">
              <h3>{comparison.name1}</h3>
              <ul>
                {comparison.stats1.map((stat, index) => (
                  <li key={index}>
                    {statLabels[index]}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="comparison-card">
            <img src={comparison.sprite2} alt={comparison.name2} className="comparison-image" />
            <div className="comparison-details">
              <h3>{comparison.name2}</h3>
              <ul>
                {comparison.stats2.map((stat, index) => (
                  <li key={index}>
                    {statLabels[index]}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {!comparison && (pokemon1 || pokemon2) && <p>Please select two valid Pokémon.</p>}
    </div>
  );
};

export default ComparisonTool;