import React, { useState } from 'react';
import logo from '../assets/daonLogo.png';
import { useNavigate } from 'react-router-dom';
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
            <header>
                <div className="logo" onClick={() => nav('/')}>
                    <img src={logo} className="logo-img" alt="logo" />
                    <br />
                    <span className="logo-text">귀어로드</span>
                </div>
                <div className="menu" onClick={toggleSidebar}>
                    <i className="fi fi-br-menu-burger"></i>
                </div>
            </header>

            {/* ✅ 사이드바 */}
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}></SideBar>
        </>
    );
};

export default Header;
