import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';

const SearchBar = () => {
  const { setFilteredPokemons, pokemons, sortBy, setSortBy, filters, setFilters, searchTerm, setSearchTerm } = usePokemon();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    const newFilters = e.target.checked
      ? [...filters, type]
      : filters.filter(f => f !== type);
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('id');
    setFilters([]);
  };

  const typeOptions = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

  return (
    <div className="search-bar">
      <div className="search-controls">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button onClick={clearFilters} className="clear-search-button">
            Clear
          </button>
        </div>
        <div className="sort-wrapper">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortBy} onChange={handleSortChange} className="sort-select">
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="type-filters">
        <h4>Type Filters</h4>
        <div className="filter-grid">
          {typeOptions.map(type => (
            <label key={type} className="filter-label">
              <input
                type="checkbox"
                value={type}
                checked={filters.includes(type)}
                onChange={handleFilterChange}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;