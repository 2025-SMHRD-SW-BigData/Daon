// 📁 Header.jsx - 모든 페이지 공통 상단 헤더 컴포넌트 (Main 기준 스타일 통일)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/daonLogo.png';
import '../style/header.css';
import SideBar from './SideBar';

const Header = () => {
  const nav = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="header-wrapper">
        {/* 좌측: 로고 이미지 + 텍스트 */}
        <div className="logo-area" onClick={() => nav('/')}> 
          <img src={logo} className="logo-img" alt="logo" />
          <span className="logo-text">귀어로드</span>
        </div>

        {/* 우측: 햄버거 메뉴 */}
        <div className="menu-area" onClick={toggleSidebar}>
          <i className="fi fi-br-menu-burger"></i>
        </div>
      </header>

      {/* 사이드바 */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;