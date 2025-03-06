/**
 * Componente RecipeList: Muestra una lista de recetas en formato de cuadrícula
 *
 * Este componente maneja tres estados principales:
 * 1. Estado de carga (muestra un spinner y esqueletos de carga)
 * 2. Estado vacío (cuando no hay recetas para mostrar)
 * 3. Estado con resultados (muestra las tarjetas de recetas)
 *
 * Adicionalmente, este componente maneja el filtrado de recetas con imágenes inválidas,
 * eliminando aquellas cuyas imágenes no puedan cargarse correctamente.
 *
 * @param {Array} recipes - Array de objetos de recetas a mostrar
 * @param {boolean} isLoading - Indica si las recetas están siendo cargadas
 * @param {Function} toggleFavorite - Función para alternar el estado de favorito de una receta
 * @param {Function} isFavorite - Función que determina si una receta es favorita
 */
import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import SkeletonLoader from "./SkeletonLoader";
import { FaSearch, FaSpinner } from "react-icons/fa";

const RecipeList = ({
  recipes,
  isLoading = false,
  toggleFavorite,
  isFavorite,
}) => {
  // Estado para mantener las recetas filtradas (sin imágenes inválidas)
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Inicializa las recetas filtradas con las recetas originales, pero filtrando las problemáticas
  useEffect(() => {
    // Detecta recetas problemáticas antes de mostrarlas
    const preFilterRecipes = (recipes) => {
      if (!recipes || !Array.isArray(recipes)) return [];
      
      // Patrones problemáticos conocidos en URLs de imágenes
      const problematicPatterns = [
        'no-disponible',
        'no-available',
        'not-available',
        'no-image',
        'missing-image',
        'placeholder',
        'default.jpg',
        'default.png',
      ];
      
      return recipes.filter(item => {
        if (!item || !item.recipe || !item.recipe.image) return false;
        
        const imageUrl = item.recipe.image.toLowerCase();
        
        // Verificar si es una URL válida
        if (typeof imageUrl !== 'string' || 
            imageUrl.length < 10 || 
            !imageUrl.startsWith('https://')) {
          return false;
        }
        
        // Verificar patrones problemáticos
        for (const pattern of problematicPatterns) {
          if (imageUrl.includes(pattern)) {
            return false;
          }
        }
        
        return true;
      });
    };
    
    // Aplicar filtro previo a las recetas
    const preFilteredRecipes = preFilterRecipes(recipes);
    setFilteredRecipes(preFilteredRecipes);
  }, [recipes]);

  // Función para manejar los errores de carga de imágenes
  const handleImageError = (recipeWithError) => {
    if (!recipeWithError) return;
    
    // Elimina la receta con error de la lista filtrada
    setFilteredRecipes(currentRecipes => 
      currentRecipes.filter(item => 
        item.recipe && item.recipe.label !== recipeWithError.label
      )
    );
  };
  // Renderiza un mensaje de estado vacío cuando no hay recetas y no está cargando
  if (!filteredRecipes.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center my-16 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-fade-in">
        <FaSearch className="text-5xl text-gray-300 dark:text-gray-600 mb-6" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No hay recetas para mostrar
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Busca ingredientes para descubrir deliciosas recetas
        </p>
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
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Buscando las mejores recetas para ti...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ...Array(6)
                .fill()
                .map((_, index) => (
                  <SkeletonLoader key={`skeleton-${index}`} />
                )),
            ]}
          </div>
        </div>
      )}

      {/* Mapea las recetas y las pasa al componente RecipeCard */}
      {!isLoading && filteredRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredRecipes.map((recipeItem, index) => (
            <RecipeCard
              key={`recipe-${index}-${recipeItem.recipe.label}`}
              recipe={recipeItem.recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              onImageError={handleImageError} /* Pasamos la función para manejar errores de imagen */
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeList; // Exporta el componente RecipeList
