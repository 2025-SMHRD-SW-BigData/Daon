// ✅ Login.jsx - Header 밀림 개선 포함 통합본
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import boatVideo from '../assets/boat-sail.mp4';
import '../style/header.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const nav = useNavigate();

  const handleLogin = () => {
    setShowVideo(true);
    setTimeout(() => {
      axios
        .post('http://192.168.219.45:3003/user/login', {
          user_id: id,
          password: pw,
        })
        .then((res) => {
          setShowVideo(false);
          if (res.data.success) {
            setUser({
              user_id: res.data.user_id,
              username: res.data.username,
              nickname: res.data.nickname,
              role: res.data.role,
            });
            alert('로그인 성공!');
            nav('/');
          } else {
            alert(res.data.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        })
        .catch((error) => {
          setShowVideo(false);
          console.error('로그인 요청 실패:', error);
          alert('서버 오류로 로그인에 실패했습니다.');
        });
    }, 800);
  };

  return (
    <div className="phon_size">
      <Header />

      {showVideo && (
        <div
          className="video-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <video autoPlay muted playsInline width="250" height="auto">
            <source src={boatVideo} type="video/mp4" />
            로딩중...
          </video>
        </div>
      )}

      <div className="scroll-area">
        <div className="join-title">로그인</div>
        <br /> <br /> <br /> <br />
        <form className="join-form">
          <p>아이디</p>
          <input
            type="text"
            placeholder="아이디"
            className="join-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          <p>비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호"
            className="join-input"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <br /> <br /> <br /> <br />
          <button type="button" onClick={handleLogin} className="join-button">
            로그인
          </button>

          <div
            style={{
              marginTop: '30px',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            <span
              style={{
                color: '#999',
                cursor: 'pointer',
                marginRight: '8px',
                marginLeft: '-10px',
              }}
              onClick={() => nav('/idfind')}
            >
              아이디 찾기
            </span>
            <span style={{ color: '#999' }}> | </span>
            <span
              style={{ color: '#999', cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => nav('/pwfind')}
            >
              비밀번호 찾기
            </span>
            <span style={{ color: '#999', marginLeft: '8px' }}> | </span>
            <span
              style={{ color: '#999', cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => nav('/join')}
            >
              회원가입
            </span>
          </div>
        </form>
      </div>

      <NavBar />
    </div>
  );
};

export default Login;