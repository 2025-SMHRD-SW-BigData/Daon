import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';

const Login = () => {

const nav = useNavigate();

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
      <br/>
      <br /><br /><br /><br />
      <form className="join-form">
        <p>아이디</p>
        <input type="text" placeholder="아이디" className="join-input" />
        <br></br>
        <p>비밀번호</p>
        <input type="password" placeholder="비밀번호" className="join-input" />
       <br></br>
       <br />
       <br />
       <br /><br /><br /><br />
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
      <NavBar></NavBar>
    </div>
  );
};


export default Login;