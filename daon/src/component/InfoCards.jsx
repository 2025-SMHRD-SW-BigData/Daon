// ✅ InfoCards.jsx - 어업 정보 카드 4개 출력 컴포넌트

import React from 'react';
import '../style/infocards.css';

const InfoCards = () => {
  const infoList = [
    '어업 창업 정보 열람',
    '자격증 교육 정보',
    '어업 장비 정보',
    '정착 지원 정보',
  ];

  return (
    <div className="info-card-grid">
      {infoList.map((text, idx) => (
        <div key={idx} className="info-card">{text}</div>
      ))}
    </div>
  );
};

export default InfoCards;
