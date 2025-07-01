// ✅ InfoCards.jsx - 어업 정보 카드 4개 출력 컴포넌트

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/infocards.css';

const InfoCards = () => {
  const nav = useNavigate();

  const infoMap = {
    '어촌 정보 탐색': '/farminginfo',
    '어선 정보': '/vesselcategory', 
    '지원금 및 정책': '/policyinfo',
    '어업 자격': '/licenseinfo',
  };

  const handleClick = (text) => {
    nav(infoMap[text]);
  };

  const infoList = Object.keys(infoMap);

  return (
    <div className="info-card-grid">
      {infoList.map((text, idx) => (
        <div
          key={idx}
          className="info-card"
          onClick={() => handleClick(text)}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
