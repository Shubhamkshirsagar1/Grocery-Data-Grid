import React from "react";
import "./FilterBar.css";

const FilterBar = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="filter">
      <label htmlFor="category">Filter by Category:</label>
      <select id="category" value={selectedCategory} onChange={onChange}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
