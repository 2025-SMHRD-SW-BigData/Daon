// RecommendList.jsx - REGION 키가 없는 데이터에 맞춰 출력 조건 조정
import React from 'react';
import { getRecommendedHarbors } from '../utils/recommendHarbors';
import '../style/recommendlist.css';

const RecommendList = ({ vesselType }) => {
  const recommended = getRecommendedHarbors(vesselType);

  if (recommended.length === 0) return null;

  return (
    <div className="recommend-box">
      <h4 className="recommend-title">📍 관련 어항 목록 – {vesselType}</h4>
      <ul className="recommend-list">
        {recommended.map((h, index) => (
          <li key={index} className="recommend-item">
            <strong>{h.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendList;
