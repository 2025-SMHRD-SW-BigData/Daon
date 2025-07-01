// ✅ PolicyCategory.jsx - 정책 정보 중간 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/policycategory.css';
import { useNavigate } from 'react-router-dom';

const PolicyCategory = () => {
  const nav = useNavigate();

  const policies = [
    { label: '귀어인의 집', path: '/homehouse' },
    { label: '귀어학교지원', path: '/fischool' },
    { label: '청년어선임대사업', path: '/youthboat' },
    { label: '귀어창업지원', path: '/startupsupport' },
    { label: '청년어촌정착지원', path: '/youthsupport' },
    { label: '주택구입자금지원', path: '/housingloan' },
  ];

  return (
    <div className="phon_size">
      <Header />
      <div className="policy-category-page">
        <h2 className="policy-title">지원금 및 정책</h2>
        {policies.map((item, idx) => (
          <button
            key={idx}
            className="policy-btn"
            onClick={() => nav(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default PolicyCategory;
