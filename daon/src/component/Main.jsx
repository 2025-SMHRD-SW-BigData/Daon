import React, { useState, useEffect } from 'react';
import Map from './Map';
import axios from 'axios';
import '../style/main.css';  // CSS import

const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [villageList, setVillageList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }
    const input = inputValue.trim();
    const filtered = villageList.filter(name =>
      name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 10));
  }, [inputValue, villageList]);

  const handleSelectSuggestion = (name) => {
    setInputValue(name);
    setSearchText(name);
    setSuggestions([]);
  };

  const doSearch = () => {
    setSearchText(inputValue.trim());
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      doSearch();
    }
  };

  return (
    <div className="main-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="항구명을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="search-input"
        />
        <button
          onClick={doSearch}
          type="button"
          className="search-button"
        >
          검색
        </button>

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((name, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(name)}
                onMouseDown={e => e.preventDefault()}
                className="suggestion-item"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section-title" style={{ marginTop: '20px' }}>
        <Map height={400} searchText={searchText} />
      </div>
    </div>
  );
};

export default Main;
