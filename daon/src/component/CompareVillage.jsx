// CompareVillage.jsx - 중복 항구명 제거 및 버튼 디자인 개선 반영
import React, { useState, useEffect } from 'react';
import '../style/comparevillage.css';
import Header from './Header';
import NavBar from './NavBar';

const CompareVillage = () => {
  const [villageData, setVillageData] = useState([]);
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [groupedVillages, setGroupedVillages] = useState({});

  useEffect(() => {
    fetch('/filtered_village_data_clean.json')
      .then((res) => res.json())
      .then((data) => {
        setVillageData(data);

        const grouped = {};
        data.forEach((village) => {
          const name = village.FSHNG_PRT_NM;
          const group = getInitialConsonant(name[0]);
          if (!grouped[group]) grouped[group] = [];
          if (!grouped[group].includes(name)) {
            grouped[group].push(name);
          }
        });
        setGroupedVillages(grouped);
      });
  }, []);

  const getInitialConsonant = (char) => {
    const consonants = [
      'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ',
      'ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
    ];
    const code = char.charCodeAt(0) - 44032;
    if (code < 0 || code > 11171) return char;
    const index = Math.floor(code / 588);
    return consonants[index];
  };

  const toggleVillage = (village) => {
    if (selectedVillages.includes(village)) {
      setSelectedVillages(selectedVillages.filter((v) => v !== village));
    } else if (selectedVillages.length < 3) {
      setSelectedVillages([...selectedVillages, village]);
    }
  };

  const selectedData = villageData.filter((v) => selectedVillages.includes(v.FSHNG_PRT_NM));

  return (
    <div className="phon_size">
      <Header />
      <div className="compare-container">
        <h3 className="compare-title">정착지 후보 비교</h3>
        <p className="compare-desc">어촌을 선택해 비교해보세요 (최대 3개)</p>
        <p className="selected-villages">
          선택된 어촌: {selectedVillages.join(', ') || '없음'}
        </p>

        <div className="village-scroll-area">
          {Object.keys(groupedVillages).sort((a, b) => a.localeCompare(b, 'ko-KR')).map((initial) => (
            <div key={initial}>
              <div className="initial-header">{initial}</div>
              <div className="village-button-group">
                {groupedVillages[initial].map((name) => (
                  <button
                    key={name}
                    className={`village-button ${selectedVillages.includes(name) ? 'selected' : ''}`}
                    onClick={() => toggleVillage(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedData.length > 0 && (
          <div className="compare-table-area">
            <h4>📊 항목별 비교</h4>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>항목</th>
                  {[...new Set(selectedData.map(v => v.FSHNG_PRT_NM))].map((name, idx) => (
                    <th key={idx}>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>교육시설 수</td>
                  {selectedData.map((v, idx) => (
                    <td key={idx}>{v.education || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td>공공시설 수</td>
                  {selectedData.map((v, idx) => (
                    <td key={idx}>{v.public || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td>항구 거리 (km)</td>
                  {selectedData.map((v, idx) => (
                    <td key={idx}>{v.distance || 'N/A'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default CompareVillage;
