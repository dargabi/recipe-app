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
          <option value="">Todos los tiempos</option>
          <option value="30">30 minutos o menos</option>
          <option value="45">45 minutos o menos</option>
          <option value="60">1 hora o menos</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="diet-filter">Tipo de dieta</label>
        <select
          id="diet-filter"
          onChange={(e) => onFilterChange('diet', e.target.value)}
        >
          <option value="">Todas las dietas</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="vegano">Vegano</option>
          <option value="sin-gluten">Sin gluten</option>
          <option value="sin-lacteos">Sin lácteos</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Ordenar por</label>
        <select
          id="sort-filter"
          onChange={(e) => onFilterChange('sort', e.target.value)}
        >
          <option value="">Sin ordenar</option>
          <option value="time">Tiempo de preparación</option>
          <option value="calories">Calorías</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
