// LicenseInfo.jsx - 어업 자격 중간 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/licenseinfo.css';

const LicenseInfo = () => {
  const handleClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="phon_size">
      <Header />

      <div className="license-container">
        <h2 className="license-title">어업 자격</h2>

        <button className="license-btn" onClick={() => handleClick('/licensedfishery')}>면허어업</button>
        <button className="license-btn" onClick={() => handleClick('/permitfishery')}>허가어업</button>
        <button className="license-btn" onClick={() => handleClick('/reportfishery')}>신고어업</button>
        <button className="license-btn" onClick={() => handleClick('/fishingboat')}>낚시어선업</button>
        <button className="license-btn" onClick={() => handleClick('/fischool')}>자격증</button>
      </div>

      <NavBar />
    </div>
  );
};

export default LicenseInfo;
