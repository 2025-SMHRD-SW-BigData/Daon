// RecommendList.jsx - 추천 어항 목록 컴포넌트 (토글 + 가나다 정렬 포함)
import React, { useState } from 'react';
import { getRecommendedHarbors } from '../utils/recommendHarbors';
import '../style/recommendlist.css';

const RecommendList = ({ vesselType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const recommended = getRecommendedHarbors(vesselType);

  if (!recommended || recommended.length === 0) return null;

  // 가나다순 정렬
  const sorted = [...recommended].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko')
  );

  return (
    <div className="recommend-box">
      <button className="recommend-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '▼ 추천 어항 숨기기' : '▶ 추천 어항 보기'}
      </button>

      {isOpen && (
        <ul className="recommend-list">
          {sorted.map((h, index) => (
            <li key={index} className="recommend-item">
              <strong>{h.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendList;
