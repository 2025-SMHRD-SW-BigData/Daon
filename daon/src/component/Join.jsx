import React from 'react';
import '../style/main.css'; // CSS 파일 임포트

const Join = () => {
  return (
    
    <div className="join-container" style={{
        width: '390px',
        height: '844px',
        margin: '0 auto',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '24px',
        padding: '24px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    


    
    </div>
  );
};

export default Join;
