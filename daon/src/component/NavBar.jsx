import React from 'react'
import Map from './Map'
import { useNavigate } from 'react-router-dom'
import '../style/navbar.css'

const NavBar = () => {
    
    const nav = useNavigate();

    return (
        <nav className="footer-nav"
          style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '390px',
          zIndex: 10,
          backgroundColor: 'white',
          borderTop: '1px solid #ccc',
        }}
        >
            <div className="nav-item" onClick={()=>{nav('/map')}}>
                <i className="fi fi-rr-marker"></i>
                <span >어촌지도</span>
            </div>
            <div className="nav-item" onClick={()=>{nav('/chatbot')}}>
                <i className="fi fi-rr-user-robot"></i>
                <span>AI채팅</span>
            </div>
            <div className="nav-item" onClick={()=>{nav('/')}}>
                <i className="fi fi-rr-home-location-alt"></i>
                <span>홈</span>
            </div>
            <div className="nav-item">
                <i className="fi fi-rr-bell" ></i>
                <span>알림</span>
            </div>
            <div className="nav-item" onClick={()=>{nav('/login')}}>
                <i className="fi fi-rr-user"></i>
                <span>로그인</span>
            </div>
            
      
      
        
      
             
        </nav>
    )
}

export default NavBar