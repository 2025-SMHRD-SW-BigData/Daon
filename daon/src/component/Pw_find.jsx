import React, { useState } from 'react'
import Header from './Header'
import NavBar from './NavBar'
import '../style/idfind.css'
import axios from 'axios'

const Pw_find = () => {

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [resPw, setResPw] = useState('');
  const [errM, setErrM] = useState('');

  const handleFIndPw = () => {
    if (!name || !userId) {
      setErrM('이름과 아이디를 모두 입력하세요')
      setResPw('');
      return;
    }
    
    axios
    .post('http://localhost:3003/user/find-pw', { name: name, id: userId })
    .then((res) => {
      if (res.data.pw) {
        setResPw(res.data.pw);
        setErrM('');
      }
      else {
        setResPw('');
        setErrM('일치하는 회원 정보가 없습니다')
      }
    })
    .catch((err) => {
      setResPw('');
      setErrM('서버 오류가 발생했습니다')
    })
  }

  return (
    <div style={{
      width: '390px',
      height: '844px',
      margin: '0 auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: '24px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'

    }}>
      <Header></Header>

      <br /><br /><br />

      <div className="id-head">비밀번호 찾기</div>

      <br />
      <p className='id-body'>이름</p>
      <input className='inputname' type="text" placeholder='이름' value={name} onChange={(e) => setName(e.target.value)} />
      <p className='id-body'>아이디</p>
      <input className='inputname' type="text" placeholder='아이디' value={userId} onChange={(e) => setUserId(e.target.value)} />

      <button onClick={handleFIndPw} className='idbtn'>비밀번호 찾기</button>
      {/* 결과 아이디 표시 */}
      {resPw && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
          비밀번호: <strong>{resPw}</strong>
        </p>
      )}

      {/* 에러 메시지 표시 */}
      {errM && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
          {errM}
        </p>
      )}

      <NavBar></NavBar>

    </div>
  )
}

export default Pw_find