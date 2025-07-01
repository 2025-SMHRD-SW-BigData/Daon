// 수정된 CompareVillage.jsx

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Header from './Header';
import NavBar from './NavBar';
import '../style/comparevillage.css';

const CompareVillage = () => {
  const [villageList, setVillageList] = useState([]);
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [groupedVillages, setGroupedVillages] = useState({});

  // CSV 로드 및 초성 기준 정렬
  useEffect(() => {
    Papa.parse('/filtered_village_data.csv', {
      header: true,
      download: true,
      complete: (result) => {
        const validData = result.data.filter(v => v.FSHNG_PRT_NM?.trim());
        setVillageList(validData);
        groupByInitial(validData);
      },
    });
  }, []);

  // 초성별 그룹화
  const groupByInitial = (list) => {
    const groups = {};
    list.forEach((item) => {
      const name = item.FSHNG_PRT_NM.trim();
      const initial = getInitialConsonant(name[0]);
      if (!groups[initial]) groups[initial] = [];
      if (!groups[initial].some(v => v.FSHNG_PRT_NM === name)) {
        groups[initial].push(item);
      }
    });
    setGroupedVillages(groups);
  };

  const getInitialConsonant = (char) => {
    const code = char.charCodeAt(0) - 44032;
    const initialIndex = Math.floor(code / 588);
    const initials = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    return initials[initialIndex] || char;
  };

  const handleSelect = (village) => {
    if (selectedVillages.find(v => v.FSHNG_PRT_NM === village.FSHNG_PRT_NM)) return;
    if (selectedVillages.length >= 3) return alert('최대 3개까지 비교할 수 있습니다.');
    setSelectedVillages([...selectedVillages, village]);
  };

  return (
    <div className="compare-container phon_size">
      <Header />
      <div className="scroll-area">
        <h2 className="title">정착지 후보 비교</h2>
        <p className="subtitle">어촌을 선택해 비교해보세요 (최대 3개)</p>

        <div className="scrollable-list">
          {Object.keys(groupedVillages).sort().map((initial, idx) => (
            <div key={idx} className="village-group">
              <h4>{initial}</h4>
              <div className="village-buttons">
                {groupedVillages[initial].map((v, i) => (
                  <button key={i} className="village-button" onClick={() => handleSelect(v)}>
                    {v.FSHNG_PRT_NM.trim()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed-result">
        <h3>선택된 어촌</h3>
        <ul>
          {selectedVillages.length === 0 && <li>선택된 항목이 없습니다.</li>}
          {selectedVillages.map((v, idx) => (
            <li key={idx}>{v.FSHNG_PRT_NM} - {v.FP_ADDR_DNL || '주소 없음'}</li>
          ))}
        </ul>

        {selectedVillages.length >= 2 && (
          <div className="compare-table">
            <h3>📊 항목별 비교</h3>
            <table>
              <thead>
                <tr>
                  <th>항목</th>
                  {selectedVillages.map((v, i) => (
                    <th key={i}>{v.FSHNG_PRT_NM}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>교육시설 수</td>
                  {selectedVillages.map((v, i) => (
                    <td key={i}>{v.EDU_FCLTY_CNT || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td>공공시설 수</td>
                  {selectedVillages.map((v, i) => (
                    <td key={i}>{v.PBLC_FCLTY_CNT || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td>항구 거리 (km)</td>
                  {selectedVillages.map((v, i) => (
                    <td key={i}>{v.NRB_FP_DIST || 'N/A'}</td>
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