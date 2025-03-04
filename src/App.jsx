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
    
    // Spoonacular API configuration
    const API_KEY = "998b5c5c67e1450581aca695e5c350ff";
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}&addRecipeInformation=true&fillIngredients=true&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener las recetas');
      }
      
      const data = await response.json();
      
      if (data.results.length === 0) {
        setError('No se encontraron recetas con estos ingredientes. ¡Intenta con otros!');
      } else {
        // Transformar el formato de Spoonacular al formato que espera nuestra app
        const transformedRecipes = data.results.map(recipe => ({
          recipe: {
            label: recipe.title,
            image: recipe.image,
            totalTime: recipe.readyInMinutes,
            yield: recipe.servings,
            ingredientLines: recipe.extendedIngredients.map(ing => ing.original),
            healthLabels: [
              ...(recipe.vegetarian ? ['Vegetariano'] : []),
              ...(recipe.vegan ? ['Vegano'] : []),
              ...(recipe.glutenFree ? ['Sin Gluten'] : []),
              ...(recipe.dairyFree ? ['Sin Lácteos'] : []),
            ].filter(label => label),
            dietLabels: [
              ...(recipe.lowFodmap ? ['Bajo FODMAP'] : []),
              ...(recipe.veryHealthy ? ['Muy Saludable'] : []),
              ...(recipe.ketogenic ? ['Keto'] : []),
            ].filter(label => label),
            url: recipe.sourceUrl
          }
        }));
        setRecipes(transformedRecipes);
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
        <p>Desarrollado con la API de Recetas de Spoonacular</p>
      </footer>
    </div>
  );
}

export default App;