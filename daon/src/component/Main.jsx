import React, { useState, useEffect } from 'react';
import '../style/main.css';
import mapImg from '../assets/map.png';
import comuImg from '../assets/comu.png';
import Header from './Header';
import NavBar from './NavBar';
import Map from './Map'; // 두번째 코드에서 Map 컴포넌트 사용 중이라 가정
import axios from 'axios';

const Main = () => {
  // 검색창 및 자동완성 상태
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [villageList, setVillageList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // 항구 리스트 로드 (fishing_village.json)
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

  // 자동완성 필터링
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
    <div
      style={{
        width: '390px',
        height: '844px',
        margin: '0 auto',
        borderRadius: '24px',
        border: '1px solid #ccc',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 스크롤 가능한 영역 (Header + 검색창 + 콘텐츠) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          paddingBottom: '76px', // NavBar 높이만큼 여백 확보
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <Header />
        <NavBar />

        {/* 검색창 + 자동완성 */}
        <div className="search-box" style={{ margin: '16px 0 24px 0', position: 'relative' }}>
          <input
            type="text"
            placeholder="항구명을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={doSearch}
            type="button"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'rgb(102,165,237)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            검색
          </button>

          {suggestions.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderTop: 'none',
                maxHeight: '150px',
                overflowY: 'auto',
                borderRadius: '0 0 8px 8px',
                zIndex: 1000,
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {suggestions.map((name, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelectSuggestion(name)}
                  onMouseDown={e => e.preventDefault()} // input focus 유지
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 지도 컴포넌트 (searchText에 따라 동작) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            marginBottom: '20px',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Map 컴포넌트가 있다면 아래처럼 사용, 없다면 이미지 대체 */}
          {Map ? (
            <Map height={200} searchText={searchText} />
          ) : (
            <>
              <img
                src={mapImg}
                alt="map"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                어촌 정보 탐색 지도
              </div>
            </>
          )}
        </div>

        {/* 정보 카드 4개 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            backgroundColor: 'rgb(102,165,237)',
            padding: '12px',
            borderRadius: '20px',
            marginBottom: '20px',
          }}
        >
          {[
            '어업 창업 정보 열람',
            '자격증 교육 정보',
            '어업 장비 정보',
            '정착 지원 정보',
          ].map((text, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'rgb(102,165,237)',
                height: '80px',
                textAlign: 'center',
                padding: '8px',
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* 커뮤니티 섹션 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '120px',
            marginBottom: '20px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid black',
          }}
        >
          <img
            src={comuImg}
            alt="커뮤니티"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'rgb(102,165,237)',
              fontSize: '18px',
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            커뮤니티
          </div>
        </div>
      </div>
{/* 
      하단 고정 네비게이션
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '390px',
          zIndex: 10,
          backgroundColor: 'white',
          borderTop: '1px solid #ccc',
        }}
      >
        <NavBar />
      </div> */}
    </div>
  );
};

export default Main;
