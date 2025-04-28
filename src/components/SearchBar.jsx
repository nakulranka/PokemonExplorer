function SearchBar({ searchTerm, setSearchTerm, selectedType, setSelectedType, types }) {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Types</option>
          {types.map(type => (
            <option key={type} value={type} style={{ textTransform: 'capitalize' }}>
              {type}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default SearchBar;