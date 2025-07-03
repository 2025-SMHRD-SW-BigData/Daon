import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/navbar.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios'

const NavBar = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!user || !user.user_id) return;

    const fetchNotifications = () => {
      axios
        .post('http://localhost:3003/community/comments/notice', {
          user_id: user.user_id
        })
        .then((res) => {
          const newComments = res.data.result || [];

          // 댓글 알림이 이전과 다를 때만 업데이트
          if (JSON.stringify(newComments) !== JSON.stringify(comments)) {
            console.log('📬 새로운 알림이 있습니다!');
            setComments(newComments);
          }
        })
        .catch((error) => {
          console.error('🔴 알림 불러오기 오류:', error);
        });
    };

    fetchNotifications(); // 처음 한 번 실행
    const intervalId = setInterval(fetchNotifications, 5000); // 5초마다 실행

    return () => clearInterval(intervalId); // 언마운트 시 인터벌 해제
  }, [user, comments]); // user나 comments 변경 시만 인터벌 설정


  const toggleNotifications = () => {
    if (showNotifications && comments.length > 0) {
      // 알림창 닫을 때 서버에 알림 읽음 처리
      axios
        .post('http://localhost:3003/community/comments/notice/clear', {
          user_id: user.user_id
        })
        .then(() => {
          console.log('✅ 알림 읽음 처리됨');
          setComments([]); // 프론트에서도 초기화
        })
        .catch((err) => {
          console.error('🔴 알림 읽음 처리 실패:', err);
        });
    }

    setShowNotifications((prev) => !prev);
    console.log('코멘트:',comments)
  };

  return (
    <nav className="footer-nav">
      <div className="nav-item" onClick={() => nav('/map')}> <i className="fi fi-rr-marker" /> <span>어촌지도</span> </div>
      <div className="nav-item" onClick={() => nav('/chatbot')}> <i className="fi fi-rr-user-robot" /> <span>AI채팅</span> </div>
      <div className="nav-item" onClick={() => nav('/')}> <i className="fi fi-rr-home-location-alt" /> <span>홈</span> </div>

      {/* 알림창 띄워버릴 부분 */}
      {user ? (
        <div className="nav-item notifications-wrapper" onClick={toggleNotifications}>
          <i className={comments.length > 0 ? "fi fi-sr-bell" : "fi fi-rr-bell"} />
          <span>알림</span>

          {showNotifications && (
            <div className="notifications-popup">
              {comments.length === 0 ? (
                <div style={{ padding: '10px', textAlign: 'center' }}>알림이 없습니다.</div>
              ) : (
                comments.map((noti, index) => (
                  <div key={index}>{noti.content}</div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="nav-item" onClick={() => alert('로그인이 필요한 기능입니다.')}>
          <i className="fi fi-rr-bell-slash" /> <span>알림</span>
        </div>
      )}


      {user ?
        <div className="nav-item" onClick={() => nav('/mypage')}> <i className="fi fi-rr-user" /> <span>MY</span> </div>
        : <div className="nav-item" onClick={() => nav('/login')}> <i className="fi fi-rr-user" /> <span>로그인</span> </div>
      }
    </nav>
  );
};



export default NavBar;

