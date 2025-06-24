import React from 'react'
import Map from './Map'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    
    const nav = useNavigate();

    return (
        <nav className="footer-nav">
            <div className="nav-item" onClick={()=>{nav('/map')}}>
                <i className="fi fi-rr-marker"></i>
                <span >어촌지도</span>
            </div>
            <div className="nav-item">
                <i className="fi fi-rr-user-robot"></i>
                <span>AI채팅</span>
            </div>
            <div className="nav-item" onClick={()=>{nav('/')}}>
                <i className="fi fi-rr-home-location-alt"></i>
                <span>홈</span>
            </div>
            <div className="nav-item">
                <i className="fi fi-rr-bell"></i>
                <span>알림</span>
            </div>
            <div className="nav-item">
                <i className="fi fi-rr-user"></i>
                <span>로그인</span>
            </div>
             
        </nav>
    )
}

export default NavBar