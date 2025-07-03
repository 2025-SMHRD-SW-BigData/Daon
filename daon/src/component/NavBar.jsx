import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/navbar.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [comments, setComments] = useState([]);

  const isMainPage = location.pathname === '/';

  useEffect(() => {
    if (!user || !user.user_id) return;

    const fetchNotifications = () => {
      axios
        .post('http://localhost:3003/community/comments/notice', {
          user_id: user.user_id,
        })
        .then((res) => {
          const newComments = res.data.result || [];
          if (JSON.stringify(newComments) !== JSON.stringify(comments)) {
            console.log('📬 새로운 알림이 있습니다!');
            setComments(newComments);
          }
        })
        .catch((error) => {
          console.error('🔴 알림 불러오기 오류:', error);
        });
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);

    return () => clearInterval(intervalId);
  }, [user, comments]);

  const toggleNotifications = () => {
    if (showNotifications && comments.length > 0) {
      axios
        .post('http://localhost:3003/community/comments/notice/clear', {
          user_id: user.user_id,
        })
        .then(() => {
          console.log('✅ 알림 읽음 처리됨');
          setComments([]);
        })
        .catch((err) => {
          console.error('🔴 알림 읽음 처리 실패:', err);
        });
    }

    setShowNotifications((prev) => !prev);
    console.log('코멘트:', comments);
  };

  const goBack = () => {
    if (isMainPage || window.history.length <= 1) {
      alert('최상단 페이지 입니다.');
    } else {
      nav(-1);
    }
  };

  return (
    <nav className="footer-nav">
      <div
        className={`nav-item ${isMainPage ? 'disabled' : ''}`}
        onClick={goBack}
        style={{
          pointerEvents: isMainPage ? 'none' : 'auto',
          opacity: isMainPage ? 0.3 : 1,
        }}
      >
        <i className="fi fi-rr-arrow-left" /> <span>뒤로가기</span>
      </div>

      <div className="nav-item" onClick={() => nav('/map')}>
        <i className="fi fi-rr-marker" /> <span>어촌지도</span>
      </div>

      <div className="nav-item" onClick={() => nav('/chatbot')}>
        <i className="fi fi-rr-user-robot" /> <span>AI채팅</span>
      </div>

      <div className="nav-item" onClick={() => nav('/')}> 
        <i className="fi fi-rr-home-location-alt" /> <span>홈</span>
      </div>

      {user ? (
        <div className="nav-item notifications-wrapper" onClick={toggleNotifications}>
          <i className={comments.length > 0 ? 'fi fi-sr-bell' : 'fi fi-rr-bell'} />
          <span>알림</span>
          {showNotifications && (
            <div className="notifications-popup">
              {comments.length === 0 ? (
                <div style={{ padding: '10px', textAlign: 'center' }}>알림이 없습니다.</div>
              ) : (
                comments.map((noti, index) => <div key={index}>{noti.content}</div>)
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="nav-item" onClick={() => alert('로그인이 필요한 기능입니다.')}> 
          <i className="fi fi-rr-bell-slash" /> <span>알림</span>
        </div>
      )}

      {user ? (
        <div className="nav-item" onClick={() => nav('/mypage')}>
          <i className="fi fi-rr-user" /> <span>MY</span>
        </div>
      ) : (
        <div className="nav-item" onClick={() => nav('/login')}>
          <i className="fi fi-rr-user" /> <span>로그인</span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
