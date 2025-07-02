import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import '../style/main.css';
import mapImg from '../assets/map.png';
import comuImg from '../assets/comu.png';
import Header from './Header';
import NavBar from './NavBar';
import Map from './Map';
import axios from 'axios';
import SearchBox from './SearchBox';
import InfoCards from './InfoCards';
import CommunitySection from './CommunitySection';

const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [villageList, setVillageList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();
  const isMapPage = location.pathname === '/map';
  const navigate = useNavigate(); // ✅ useNavigate 훅 사용

  // useEffect(() => {
  //   axios.get('/fishing_village.json')
  //     .then(res => {
  //       const rawData = Array.isArray(res.data) ? res.data : [res.data];
  //       const nameSet = new Set();
  //       const uniquePorts = rawData.filter(item => {
  //         const name = item.FSHNG_PRT_NM?.trim();
  //         if (nameSet.has(name)) return false;
  //         nameSet.add(name);
  //         return true;
  //       }).map(item => item.FSHNG_PRT_NM.trim());
  //       setVillageList(uniquePorts);
  //     })
  //     .catch(console.error);
  // }, []);

  // useEffect(() => {
  //   if (inputValue.trim() === '') {
  //     setSuggestions([]);
  //     return;
  //   }
  //   const input = inputValue.trim();
  //   const filtered = villageList.filter(name =>
  //     name.toLowerCase().includes(input.toLowerCase())
  //   );
  //   setSuggestions(filtered.slice(0, 10));
  // }, [inputValue, villageList]);

  // const handleSelectSuggestion = (name) => {
  //   setInputValue(name);
  //   setSearchText(name);
  //   setSuggestions([]);
  // };

  // const doSearch = () => {
  //   setSearchText(inputValue.trim());
  //   setSuggestions([]);
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     doSearch();
  //   }
  // };

  return (
    <div className="phon_size">
      <div className="scroll-area">
        <Header />

        {isMapPage && <SearchBox setSearchText={setSearchText} />}

        <div className="map-container">
          <div className="map-fallback" onClick={() => navigate('/map')} style={{ cursor: 'pointer' }}>
            <img src={mapImg} alt="map" className="map-img" />
            <div className="fallback-text styled-label">어촌 정보 탐색 지도</div>
          </div>
        </div>

        <InfoCards />
        <CommunitySection />
      </div>
      <NavBar />
    </div>
  );
};

export default Main;
