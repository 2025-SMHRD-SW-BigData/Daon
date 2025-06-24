import React from 'react';

const Login = () => {
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
      </form>
    </div>
  );
};


export default Login;