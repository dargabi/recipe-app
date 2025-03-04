// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingresa ingredientes (ej: pollo, arroz, tomates)"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar Recetas
        </button>
      </form>
      <div className="search-tips">
        <p>Consejo: Separa múltiples ingredientes con comas</p>
        <p>Consejo: Busca los ingredientes en inglés (ejemplo: tomato, onion, garlic)</p>
      </div>
    </div>
  );
};

export default SearchBar;