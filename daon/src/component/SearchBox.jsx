import React from 'react';
import '../styles/searchbox.css';

const SearchBox = ({ inputValue, onChange, onKeyDown, onSearch, suggestions, onSelect }) => (
  <div className="search-box">
    <input
      className="search-input"
      type="text"
      placeholder="항구명을 입력하세요"
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoComplete="off"
    />
    <button className="search-button" onClick={onSearch}>검색</button>
    {suggestions.length > 0 && (
      <ul className="suggestions-list">
        {suggestions.map((name, idx) => (
          <li key={idx} onMouseDown={e => e.preventDefault()} onClick={() => onSelect(name)}>
            {name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchBox;