import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <div>
      <input placeholder="Search By Name..." id="search" type="text" value={searchTerm} onChange={onChange} />
    </div>
  );
};

export default SearchBar;
