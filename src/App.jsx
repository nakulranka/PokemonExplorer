import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { PokemonProvider, usePokemon } from './contexts/PokemonContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import PokemonDetail from './components/PokemonDetail';
import FavoritesList from './components/FavoritesList';
import ComparisonTool from './components/ComparisonTool';
import Pagination from './components/Pagination';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorBoundary from './components/ErrorBoundary';
// import './App.css';
import './styles/General.css';
import './styles/Header.css';
import './styles/Layout.css';
import './styles/Sidebar.css';
import './styles/MainContent.css';
import './styles/SearchBar.css';
import './styles/PokemonList.css';
import './styles/PokemonCard.css';
import './styles/PokemonSmallCard.css';
import './styles/PokemonDetail.css';
import './styles/FavoritesList.css';
import './styles/ComparisonTool.css';
import './styles/Pagination.css';
import './styles/DashboardButton.css';
import './styles/SkeletonLoader.css';
import './styles/ErrorBoundary.css';

const PokemonList = () => {
  const { pokemons, filteredPokemons, setFilteredPokemons, loading, error, page, setPage, itemsPerPage, sortBy, filters, searchTerm } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let result = [...pokemons];
      result = result.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filters.length > 0) {
        result = result.filter(pokemon =>
          filters.every(filter => pokemon.types.some(t => t.type.name === filter))
        );
      }
      result.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.id - b.id;
      });
      setFilteredPokemons(result);
    };
    applyFiltersAndSort();
  }, [searchTerm, sortBy, filters, pokemons]);

  const paginatedPokemons = filteredPokemons.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <SkeletonLoader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-content">
      <h2>Pokémon List</h2>
      <SearchBar />
      <div className="pokemon-list">
        {paginatedPokemons.length ? (
          paginatedPokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </div>
      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
      <Pagination />
    </div>
  );
};

const RandomPokemon = () => {
  const { pokemons } = usePokemon();
  const [randomPokemon, setRandomPokemon] = React.useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleRandom = () => {
    if (pokemons.length) {
      const randomId = Math.floor(Math.random() * pokemons.length) + 1;
      const pokemon = pokemons.find(p => p.id === randomId);
      setRandomPokemon(pokemon);
    }
  };

  return (
    <div className="main-content">
      <h2>Random Pokémon</h2>
      <button onClick={handleRandom} className="dashboard-button" aria-label="Load a random Pokémon">
        Generate Random Pokémon
      </button>
      {randomPokemon && (
        <div className="pokemon-list single-card">
          <PokemonCard
            pokemon={randomPokemon}
            onClick={() => setSelectedPokemon(randomPokemon)}
          />
        </div>
      )}
      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

const Sidebar = () => (
  <aside className="sidebar">
    <h3 className="sidebar-title">Dashboard</h3>
    <nav className="sidebar-nav">
      <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className="link-icon">📜</span> Pokémon List
      </NavLink>
      <NavLink to="/favorites" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className="link-icon">❤️</span> Favorites
      </NavLink>
      <NavLink to="/compare" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className="link-icon">⚖️</span> Compare Pokémon
      </NavLink>
      <NavLink to="/random" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className="link-icon">🎲</span> Random Pokémon
      </NavLink>
    </nav>
  </aside>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router basename="/pokemonExplorer">
      <PokemonProvider>
        <FavoritesProvider>
          <ErrorBoundary>
            <div className="dashboard">
              <Header />
              <div className="layout">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                  {isSidebarOpen ? '✖' : '☰'}
                </button>
                <Sidebar className={isSidebarOpen ? 'sidebar' : 'sidebar hidden'} />
                <main>
                  <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/favorites" element={
                      <div className="main-content">
                        <h2>Favorites</h2>
                        <FavoritesList />
                      </div>
                    } />
                    <Route path="/compare" element={
                      <div className="main-content">
                        <h2>Compare Pokémon</h2>
                        <ComparisonTool />
                      </div>
                    } />
                    <Route path="/random" element={<RandomPokemon />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ErrorBoundary>
        </FavoritesProvider>
      </PokemonProvider>
    </Router>
  );
}

export default App;