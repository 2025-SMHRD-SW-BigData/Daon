import React from 'react';
import '../style/main.css'; // CSS 파일 임포트
import NavBar from './NavBar';

const Join = () => {
  return (
    
    <div className="join-container" style={{
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
      <div className="join-title">회원가입</div>
      <br/>
      <form className="join-form">
        아이디
        <input type="text" placeholder="아이디" className="join-input" />
        비밀번호
        <input type="password" placeholder="비밀번호" className="join-input" />
        비밀번호 확인
        <input type="password" placeholder="비밀번호 확인" className="join-input" />
        이름
        <input type="text" placeholder="이름" className="join-input" />
        휴대폰 번호
        <input type="text" placeholder="휴대폰번호 입력" className="join-input" />
        <br/>
        <br />
        <br />
        <br />
        <br />
        <button type="submit" className="join-button">가입하기</button>
      </form>
    
<NavBar></NavBar>

    
    </div>
  );
};

export default Join;
