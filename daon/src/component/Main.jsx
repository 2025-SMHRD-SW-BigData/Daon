// src/components/Main.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/main.css';
import mapImg from '../assets/map.png';
import comuImg from '../assets/comu.png';
import Header from './Header';
import NavBar from './NavBar';
import Map from './Map';

const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [villageList, setVillageList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('/fishing_village.json')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        const unique = [...new Set(data.map(item => item.FSHNG_PRT_NM?.trim()))];
        setVillageList(unique);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    setSuggestions(
      query
        ? villageList.filter(name => name.toLowerCase().includes(query)).slice(0, 10)
        : []
    );
  }, [inputValue, villageList]);

  const handleSelect = name => {
    setInputValue(name);
    setSearchText(name);
    setSuggestions([]);
  };

  const doSearch = () => {
    setSearchText(inputValue.trim());
    setSuggestions([]);
  };

  return (
    <div className="screen-container">
      <div className="scroll-area">
        <Header />
        {/* 검색 */}
        <div className="search-box">
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="항구명을 입력하세요"
            className="search-input"
            autoComplete="off"
          />
          <button onClick={doSearch} className="search-button">검색</button>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((name, i) => (
                <li key={i} onMouseDown={e => e.preventDefault()} onClick={() => handleSelect(name)}>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 지도 */}
        <div className="map-container">
          {Map ? (
            <Map height={200} searchText={searchText} />
          ) : (
            <div className="map-fallback">
              <img src={mapImg} alt="map" />
              <div className="fallback-text">어촌 정보 탐색 지도</div>
            </div>
          )}
        </div>

        {/* 정보 카드 */}
        <div className="info-card-grid">
          {['어업 창업 정보 열람','자격증 교육 정보','어업 장비 정보','정착 지원 정보'].map((t,i)=>(
            <div key={i} className="info-card">{t}</div>
          ))}
        </div>

        {/* 커뮤니티 */}
        <div className="community-section">
          <img src={comuImg} alt="커뮤니티" className="community-img" />
          <div className="community-label">커뮤니티</div>
        </div>
      </div>

      {/* 네비게이션 */}
      <NavBar />
    </div>
  );
};

export default Main;
