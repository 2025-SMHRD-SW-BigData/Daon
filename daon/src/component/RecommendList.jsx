// src/component/RecommendList.jsx
import React from 'react';
import { getRecommendedHarbors } from '../utils/recommendHarbors';
import '../style/recommendlist.css'; // CSS 파일은 별도로 구성해주세요

const RecommendList = ({ vesselType }) => {
  const recommended = getRecommendedHarbors(vesselType);

  return (
    <div className="recommend-container">
      <h3 className="recommend-title">🚢 관련 어항 목록 - {vesselType}</h3>
      <ul className="recommend-list">
        {recommended.length > 0 ? (
          recommended.map((h, i) => (
            <li key={i} className="recommend-item">
              <strong>{h.name}</strong> ({h.region})
            </li>
          ))
        ) : (
          <li className="recommend-empty">해당 어선에 맞는 어항 정보가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default RecommendList;
