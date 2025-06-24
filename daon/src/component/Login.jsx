import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const nav = useNavigate();

  return (
    <div className="join-container">
      <div className="join-title">로그인</div>
      <br/>
      <form className="join-form">
        <p>아이디</p>
        <input type="text" placeholder="아이디" className="join-input" />
        <br></br>
        <p>비밀번호</p>
        <input type="password" placeholder="비밀번호" className="join-input" />
       <br></br>
        <button type="submit" className="join-button">로그인</button>
      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
    <span style={{ color: '#999', 
        cursor: 'pointer',
        marginRight : '8px',
        marginLeft : '-10px' }}>아이디 찾기</span>
    <span style={{ color: '#999' }}> | </span>
    <span style={{ color: '#999', cursor: 'pointer',marginLeft :'8px' }}>비밀번호 찾기</span>
    <span style={{ color: '#999',marginLeft :'8px' }}> | </span>
    <span style={{ color: '#999', cursor: 'pointer',marginLeft :'8px' }} onClick={()=>{nav('/join')}}>회원가입</span>
  </div>
      </form>
    </div>
  );
};


export default Login;