/**
 * Componente Filters: Proporciona una interfaz de usuario para filtrar recetas por diversos criterios.
 *
 * Permite al usuario filtrar recetas por:
 * - Tiempo de preparación
 * - Tipo de dieta (vegetariano, vegano, etc.)
 * - Número máximo de ingredientes
 * - Ingredientes excluidos
 * - Criterio de ordenación
 *
 * @param {Function} onFilterChange - Función que se llama cuando cambia cualquier filtro.
 *                                    Recibe dos parámetros: el nombre del filtro y su valor.
 */
import React, { useState } from 'react';
import { FaFilter, FaSort, FaClock, FaLeaf, FaListOl, FaBan, FaRedo, FaTimes } from 'react-icons/fa';

// Estilos comunes para los elementos select para evitar repetición
const selectStyle = {
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundSize: '1em', 
  backgroundPosition: 'right 10px center', 
  backgroundRepeat: 'no-repeat', 
  paddingRight: '30px'
};

function Filters({ onFilterChange }) {
  // Estado para almacenar los ingredientes que el usuario desea excluir
  const [excludedIngredients, setExcludedIngredients] = useState('');

  /**
   * Gestiona el envío del formulario de ingredientes excluidos
   * Previene el comportamiento predeterminado y actualiza el filtro
   */
  const handleExcludedIngredientsSubmit = (e) => {
    e.preventDefault();
    onFilterChange('excludedIngredients', excludedIngredients);
  };
  
  /**
   * Limpia todos los filtros, restaurando sus valores a los predeterminados
   * y reiniciando el estado local
   */
  const clearAllFilters = () => {
    setExcludedIngredients('');
    onFilterChange('excludedIngredients', '');
    onFilterChange('time', '');
    onFilterChange('diet', '');
    onFilterChange('maxIngredients', '');
    onFilterChange('sort', '');
  };

  return (
    <div className="flex flex-col gap-4 p-0">
      {/* Encabezado con título y botón para limpiar filtros */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <FaFilter className="text-orange-500" /> 
          Filtros avanzados
        </h3>
        <button 
          onClick={clearAllFilters}
          className="button-secondary text-sm flex items-center gap-1 py-1 px-3"
          aria-label="Limpiar todos los filtros"
        >
          <FaRedo className="text-gray-500" />
          Limpiar filtros
        </button>
      </div>
      
      {/* Grid con los filtros de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Filtro de tiempo de preparación */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <label htmlFor="time-filter" className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
            <FaClock className="text-orange-400" />
            Tiempo de preparación
          </label>
          <select
            id="time-filter"
            onChange={(e) => onFilterChange('time', e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
            style={selectStyle}
          >
            <option value="">Todos los tiempos</option>
            <option value="30">30 minutos o menos</option>
            <option value="45">45 minutos o menos</option>
            <option value="60">1 hora o menos</option>
          </select>
        </div>

      {/* Filtro de tipo de dieta */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <label htmlFor="diet-filter" className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
          <FaLeaf className="text-green-500" />
          Tipo de dieta
        </label>
        <select
          id="diet-filter"
          onChange={(e) => onFilterChange('diet', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
          style={selectStyle}
        >
          <option value="">Todas las dietas</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="vegano">Vegano</option>
          <option value="sin-gluten">Sin gluten</option>
          <option value="sin-lacteos">Sin lácteos</option>
        </select>
      </div>

      {/* Filtro de número máximo de ingredientes */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <label htmlFor="max-ingredients-filter" className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
          <FaListOl className="text-indigo-500" />
          Número máximo de ingredientes
        </label>
        <select
          id="max-ingredients-filter"
          onChange={(e) => onFilterChange('maxIngredients', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
          style={selectStyle}
        >
          <option value="">Sin límite</option>
          <option value="5">5 o menos</option>
          <option value="10">10 o menos</option>
          <option value="15">15 o menos</option>
          <option value="20">20 o menos</option>
        </select>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <label htmlFor="excluded-ingredients" className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 text-sm mb-3">
          <FaBan className="text-red-500" />
          Excluir ingredientes
        </label>
        <form onSubmit={handleExcludedIngredientsSubmit}>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                id="excluded-ingredients"
                placeholder="ej: cebolla, ajo, cilantro"
                value={excludedIngredients}
                onChange={(e) => setExcludedIngredients(e.target.value)}
                className="w-full p-2.5 pl-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button 
              type="submit" 
              className="button-primary py-2 px-4 whitespace-nowrap"
            >
              Aplicar
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <span className="bg-gray-200 dark:bg-gray-600 rounded-full w-4 h-4 inline-flex items-center justify-center text-xs font-bold">i</span>
            <span>Separa los ingredientes con comas para excluirlos de los resultados</span>
          </p>
        </form>
      </div>

      {/* Filtro de ordenación de resultados */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <label htmlFor="sort-filter" className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
          <FaSort className="text-purple-500" />
          Ordenar por
        </label>
        <select
          id="sort-filter"
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
          style={selectStyle}
        >
          <option value="">Sin ordenar</option>
          <option value="time">Tiempo de preparación</option>
          <option value="calories">Calorías</option>
        </select>
      </div>
      </div>
      
      {/* Botón adicional para limpiar todos los filtros (redundante con el botón superior) */}
      <div className="flex justify-center w-full mt-6">
        <button 
          className="button-secondary py-2.5 px-5 flex items-center gap-2 whitespace-nowrap transition-all duration-300"
          onClick={clearAllFilters}
          aria-label="Limpiar todos los filtros"
        >
          <FaTimes className="text-sm" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

export default Filters;  // Exporta el componente Filters
