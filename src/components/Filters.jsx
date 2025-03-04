import React from 'react';
import './Filters.css';

function Filters({ onFilterChange }) {
  return (
    <div className="filters-container">
      
      <div className="filter-group">
        <label htmlFor="time-filter">Tiempo de preparación</label>
        <select
          id="time-filter"
          onChange={(e) => onFilterChange('time', e.target.value)}
        >
          
          {/* Opción para seleccionar todos los tiempos */}
          <option value="">Todos los tiempos</option>
          
          {/* Opción para seleccionar tiempos de 30 minutos o menos */}
          <option value="30">30 minutos o menos</option>
          
          {/* Opción para seleccionar tiempos de 45 minutos o menos */}
          <option value="45">45 minutos o menos</option>
          
          {/* Opción para seleccionar tiempos de 1 hora o menos */}
          <option value="60">1 hora o menos</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="diet-filter">Tipo de dieta</label>
        <select
          id="diet-filter"
          onChange={(e) => onFilterChange('diet', e.target.value)}
        >
          
          {/* Opción para seleccionar todas las dietas */}
          <option value="">Todas las dietas</option>
          
          {/* Opción para seleccionar dieta vegetariana */}
          <option value="vegetariano">Vegetariano</option>
          
          {/* Opción para seleccionar dieta vegana */}
          <option value="vegano">Vegano</option>
          
          {/* Opción para seleccionar dieta sin gluten */}
          <option value="sin-gluten">Sin gluten</option>
          
          {/* Opción para seleccionar dieta sin lácteos */}
          <option value="sin-lacteos">Sin lácteos</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Ordenar por</label>
        <select
          id="sort-filter"
          onChange={(e) => onFilterChange('sort', e.target.value)}
        >
          
          {/* Opción para no ordenar */}
          <option value="">Sin ordenar</option>
          
          {/* Opción para ordenar por tiempo de preparación */}
          <option value="time">Tiempo de preparación</option>
          
          {/* Opción para ordenar por calorías */}
          <option value="calories">Calorías</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;  // Exporta el componente Filters
