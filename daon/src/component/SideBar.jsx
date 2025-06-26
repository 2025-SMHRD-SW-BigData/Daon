import React from 'react'
import '../style/Sidebar.css'

const SideBar = ({ isOpen, toggleSidebar }) => {

    console.log(isOpen)
    console.log(toggleSidebar)

    return (
        <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <p id='p1'>반갑습니다.</p>
                <p id='p2'><strong>이하늘님</strong> 마이페이지 바로가기 {'>'} </p>
                <button className="my-page-btn">로그인</button>
                <button className="close-btn" onClick={toggleSidebar}>×</button>
            </div>
            <ul>
                <li onClick={() => nav('/')}>홈</li>
                <li onClick={() => nav('/about')}>소개</li>
                <li onClick={() => nav('/contact')}>문의</li>
            </ul>
        </nav>
    )
}

export default SideBar