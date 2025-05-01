import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';

const Pagination = () => {
  const { page, setPage, itemsPerPage, setItemsPerPage, filteredPokemons } = usePokemon();
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when items per page changes
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        Previous
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={page === num ? 'active' : ''}
          aria-label={`Page ${num}`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
      <select value={itemsPerPage} onChange={handleItemsPerPageChange} aria-label="Items per page">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default Pagination;