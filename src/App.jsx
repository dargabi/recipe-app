// src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (ingredients) => {
    setIsLoading(true);
    setError(null);
    
    // Edamam API configuration
    const APP_ID = "YOUR_APP_ID"; 
    const APP_KEY = "YOUR_APP_KEY";
    
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener las recetas');
      }
      
      const data = await response.json();
      
      if (data.hits.length === 0) {
        setError('No se encontraron recetas con estos ingredientes. ¡Intenta con otros!');
      } else {
        setRecipes(data.hits);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe-App by Gabriel</h1>
        <p>Encuentra recetas basadas en los ingredientes que tienes</p>
      </header>
      
      <main className="app-main">
        <SearchBar onSearch={searchRecipes} />
        
        {isLoading && <div className="loading">Cargando recetas...</div>}
        {error && <div className="error">{error}</div>}
        {!isLoading && !error && <RecipeList recipes={recipes} />}
      </main>
      
      <footer className="app-footer">
        <p>Desarrollado con la API de Recetas de Edamam</p>
      </footer>
    </div>
  );
}

export default App;