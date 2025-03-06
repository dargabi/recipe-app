import React from 'react';
import RecipeCard from './RecipeCard';
import SkeletonLoader from './SkeletonLoader';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const RecipeList = ({ recipes, isLoading = false, toggleFavorite, isFavorite }) => {

  // Verifica si no hay recetas y muestra un mensaje indicándolo
  if (!recipes.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center my-16 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-fade-in">
        <FaSearch className="text-5xl text-gray-300 dark:text-gray-600 mb-6" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No hay recetas para mostrar</h3>
        <p className="text-gray-500 dark:text-gray-400">Busca ingredientes para descubrir deliciosas recetas</p>
      </div>
    );
  }

  return (
    <>
      {/* Muestra un indicador de carga si está cargando */}
      {isLoading && (
        <div className="mb-8">
          <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8 animate-pulse">
            <FaSpinner className="text-orange-500 mr-3 text-xl animate-spin" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">Buscando las mejores recetas para ti...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6).fill().map((_, index) => (
              <SkeletonLoader key={`skeleton-${index}`} />
            ))]}  
          </div>
        </div>
      )}
      
      {/* Mapea las recetas y las pasa al componente RecipeCard */}
      {!isLoading && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {recipes.map((recipeItem, index) => (
            <RecipeCard 
              key={`recipe-${index}-${recipeItem.recipe.label}`} 
              recipe={recipeItem.recipe} 
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeList;  // Exporta el componente RecipeList
