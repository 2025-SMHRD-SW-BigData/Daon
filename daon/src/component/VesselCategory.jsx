// ✅ VesselCategory.jsx (버튼 클릭 시 각 어선 상세 페이지로 이동)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/vesselcategory.css';
import Header from './Header';
import NavBar from './NavBar';

const VesselCategory = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="phon_size">
      <Header />
      <div className="vessel-wrapper">
        <h2 className="vessel-title">어선 정보</h2>
        <div className="vessel-buttons">
          <button onClick={() => handleNavigate('/trawl')} className="vessel-btn">자망어선</button>
          <button onClick={() => handleNavigate('/longline')} className="vessel-btn">연승어선</button>
          <button onClick={() => handleNavigate('/gillnet')} className="vessel-btn">저인망어선</button>
          <button onClick={() => handleNavigate('/pairtrawl')} className="vessel-btn">권현망어선</button>
          <button onClick={() => handleNavigate('/purseine')} className="vessel-btn">통발어선</button>
          <button onClick={() => handleNavigate('/trapboat')} className="vessel-btn">잠수기어선</button>
          <button onClick={() => handleNavigate('/divingboat')} className="vessel-btn">선망어선</button>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default VesselCategory;
