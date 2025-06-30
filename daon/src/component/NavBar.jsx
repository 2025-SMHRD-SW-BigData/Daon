import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/navbar.css';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="footer-nav" style={{
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '390px',
      zIndex: 10,
      backgroundColor: 'white',
      borderTop: '1px solid #ccc',
    }}>
      <div className="nav-item" onClick={() => nav('/map')}> <i className="fi fi-rr-marker" /> <span>어촌지도</span> </div>
      <div className="nav-item" onClick={() => nav('/chatbot')}> <i className="fi fi-rr-user-robot" /> <span>AI채팅</span> </div>
      <div className="nav-item" onClick={() => nav('/')}> <i className="fi fi-rr-home-location-alt" /> <span>홈</span> </div>
      <div className="nav-item"> <i className="fi fi-rr-bell" /> <span>알림</span> </div>
      {user ? 
       <div className="nav-item" onClick={() => nav('/mypage')}> <i className="fi fi-rr-user"/> <span>MY</span> </div>
      :<div className="nav-item" onClick={() => nav('/login')}> <i className="fi fi-rr-user"/> <span>로그인</span> </div>
      }
    </nav>
  );
};



export default NavBar;

