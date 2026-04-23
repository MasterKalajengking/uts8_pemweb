import React from 'react';

function FilterBar({ category, difficulty, onFilterChange }) {
  return (
    <div className="filter-bar">
      <select
        value={category}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="Semua">Semua Kategori</option>
        <option value="Makanan Berat">Makanan Berat</option>
        <option value="Kue">Kue</option>
        <option value="Minuman">Minuman</option>
        <option value="Sambal">Sambal</option>
        <option value="Camilan">Camilan</option>
      </select>
      <select
        value={difficulty}
        onChange={(e) => onFilterChange('difficulty', e.target.value)}
      >
        <option value="Semua">Semua Kesulitan</option>
        <option value="Mudah">Mudah</option>
        <option value="Sedang">Sedang</option>
        <option value="Sulit">Sulit</option>
      </select>
    </div>
  );
}

export default FilterBar;