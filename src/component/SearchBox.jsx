// ✅ SearchBox.jsx - 내부 상태 포함 + 최신 디자인 반영 완료

import React, { useState, useEffect } from 'react';
import '../style/searchbox.css';
import axios from 'axios';

const SearchBox = ({ setSearchText }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [villageList, setVillageList] = useState([]);

  useEffect(() => {
    axios.get('/fishing_village.json')
      .then(res => {
        const rawData = Array.isArray(res.data) ? res.data : [res.data];
        const nameSet = new Set();
        const uniquePorts = rawData.filter(item => {
          const name = item.FSHNG_PRT_NM?.trim();
          if (nameSet.has(name)) return false;
          nameSet.add(name);
          return true;
        }).map(item => item.FSHNG_PRT_NM.trim());
        setVillageList(uniquePorts);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = villageList.filter(name =>
      name.toLowerCase().includes(inputValue.trim().toLowerCase())
    );
    setSuggestions(filtered.slice(0, 10));
  }, [inputValue, villageList]);

  const handleSelectSuggestion = (name) => {
    setInputValue(name);
    setSuggestions([]);
    setSearchText(name);
  };

  const doSearch = () => {
    setSearchText(inputValue.trim());
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') doSearch();
  };

  return (
    <div className="search-box">
      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="항구명을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={doSearch}>검색</button>
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((name, idx) => (
            <li key={idx} onClick={() => handleSelectSuggestion(name)}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
