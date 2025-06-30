import React,{ useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from '../context/UserContext'
import axios from 'axios'


const Login = () => {

  const { setUser } = useContext(UserContext);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const nav = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://192.168.219.45:3003/user/login', { user_id:id, password:pw })
      .then((res) => {
        if (res.data.success) {
          // 로그인 성공 시 사용자 정보 저장
          setUser({
            user_id: res.data.user_id,
            username: res.data.username
          });
          alert('로그인 성공!');
          nav('/');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error('로그인 요청 실패:', error);
        alert('서버 오류로 로그인에 실패했습니다.');
      });
  };


  return (
    <div className="join-container"
      style={{
        width: '390px',
        height: '844px',
        margin: '0 auto',
        borderRadius: '24px',
        border: '1px solid #ccc',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>

      <Header></Header>
      <div className="join-title">로그인</div>
      <br />
      <br /><br /><br /><br />
      <form className="join-form">
        <p>아이디</p>
        <input type="text" placeholder="아이디" className="join-input" value={id} onChange={(e) => setId(e.target.value)}/>
        <br></br>
        <p>비밀번호</p>
        <input type="password" placeholder="비밀번호" className="join-input" value={pw} onChange={(e)=> setPw(e.target.value)} />
        <br></br>
        <br />
        <br />
        <br /><br /><br /><br />
        <button type="button" onClick={handleLogin} className="join-button">로그인</button>
        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
          <span style={{
            color: '#999',
            cursor: 'pointer',
            marginRight: '8px',
            marginLeft: '-10px'
          }}>아이디 찾기</span>
          <span style={{ color: '#999' }}> | </span>
          <span style={{ color: '#999', cursor: 'pointer', marginLeft: '8px' }}>비밀번호 찾기</span>
          <span style={{ color: '#999', marginLeft: '8px' }}> | </span>
          <span style={{ color: '#999', cursor: 'pointer', marginLeft: '8px' }} onClick={() => { nav('/join') }}>회원가입</span>
        </div>



      </form>
      <NavBar></NavBar>
    </div>
  );
};


export default Login;