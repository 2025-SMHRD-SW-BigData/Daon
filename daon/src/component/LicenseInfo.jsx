// LicenseInfo.jsx - 어업 자격 중간 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/licenseinfo.css';
import { useNavigate } from 'react-router-dom';

const LicenseInfo = () => {
    const nav = useNavigate();


    return (
        <div className="phon_size">
            <Header />

            <div className="license-container">
                <h2 className="license-title">어업 자격</h2>

                <button className="license-btn" onClick={() => nav('/licensedfishery')}>면허어업</button>
                <button className="license-btn" onClick={() => nav('/permitfishery')}>허가어업</button>
                <button className="license-btn" onClick={() => nav('/reportfishery')}>신고어업</button>
                <button className="license-btn" onClick={() => nav('/fishingboat')}>낚시어선업</button>
            </div>

            <NavBar />
        </div>
    );
};

export default LicenseInfo;
