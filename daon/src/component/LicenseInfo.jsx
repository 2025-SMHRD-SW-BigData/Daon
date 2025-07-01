// ✅ LicenseInfo.jsx - 어업 자격 중간 카테고리 페이지
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import '../style/licensecategory.css';

const LicenseInfo = () => {
  const nav = useNavigate();

  const categoryList = [
    { text: '면허어업', path: '/licensedfishery' },
    { text: '허가어업', path: '/permitfishery' },
    { text: '신고어업', path: '/reportfishery' },
    { text: '낚시어선업', path: '/fishingboat' },
    { text: '자격증', path: '/fischool' },
  ];

  return (
    <div className="phon_size">
      <Header />

      <h2 className="category-title">어업 자격</h2>

      <div className="category-list">
        {categoryList.map(({ text, path }, index) => (
          <button key={index} onClick={() => nav(path)} className="category-btn">
            {text}
          </button>
        ))}
      </div>

      <NavBar />
    </div>
  );
};

export default LicenseInfo;
