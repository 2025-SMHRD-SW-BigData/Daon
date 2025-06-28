import React, {useState} from 'react';
import '../style/main.css'; // CSS 파일 임포트
import NavBar from './NavBar';
import axios from 'axios';

const Join = () => {
    const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    confirmPassword: '',
    username: '',
    nickname: '',
    phone_number: '',
    role: 'user', // 기본값
  });

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 제출 처리 (예시: 콘솔 출력)
  const handleSubmit = async (e) => {
    e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
   try {
const response = await axios.post('http://localhost:3003/api/join', {
  user_id: formData.user_id,
  password: formData.password,
  confirmPassword: formData.confirmPassword, 
  username: formData.username,
  nickname: formData.nickname,
  phone_number: formData.phone_number,
  role: formData.role
});

    if (response.data.success) {
      alert('회원가입 성공!');
      // 필요하면 로그인 페이지로 이동도 가능
      // navigate('/login');
    } else {
      alert('회원가입 실패: ' + response.data.message);
    }
} catch (error) {
    console.error('회원가입 에러:', error);
    if (error.response && error.response.data && error.response.data.message) {
      alert('회원가입 실패: ' + error.response.data.message);
    } else {
      alert('서버 오류! 다시 시도해주세요.');
    }
  }
};
  
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
      <form className="join-form" onSubmit={handleSubmit}>
  아이디
  <input
    type="text"
    name="user_id"
    placeholder="아이디"
    className="join-input"
    value={formData.user_id}
    onChange={handleChange}
  />
  비밀번호
  <input
    type="password"
    name="password"
    placeholder="비밀번호"
    className="join-input"
    value={formData.password}
    onChange={handleChange}
  />
  비밀번호 확인
  <input
    type="password"
    name="confirmPassword"
    placeholder="비밀번호 확인"
    className="join-input"
    value={formData.confirmPassword}
    onChange={handleChange}
  />
  이름
  <input
    type="text"
    name="username"
    placeholder="이름"
    className="join-input"
    value={formData.username}
    onChange={handleChange}
  />
  닉네임
  <input
    type="text"
    name="nickname"
    placeholder="닉네임 입력"
    className="join-input"
    value={formData.nickname}
    onChange={handleChange}
  />
  휴대폰 번호
  <input
    type="text"
    name="phone_number"
    placeholder="휴대폰번호 입력"
    className="join-input"
    value={formData.phone_number}
    onChange={handleChange}
  />
  <label className="join-label">유형</label>
<div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  marginBottom: '20px'
}}>
  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <input
      type="radio"
      name="role"
      value="user"
      checked={formData.role === 'user'}
      onChange={handleChange}
    />
    회원
  </label>

  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <input
      type="radio"
      name="role"
      value="counselor"
      checked={formData.role === 'counselor'}
      onChange={handleChange}
    />
    상담가
  </label>
</div>
  <button type="submit" className="join-button">가입하기</button>
</form>
<NavBar></NavBar>

    
    </div>
  );
};

export default Join;