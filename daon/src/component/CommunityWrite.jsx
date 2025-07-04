import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitywrite.css';
import '../style/headerlayout.css';
import { UserContext } from '../context/UserContext';

const CommunityWrite = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: user.user_id,
    region: '전체지역',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://192.168.219.45:3003/community/write', form)
      .then(() => {
        alert('등록 완료');
        navigate('/community');
      })
      .catch((err) => {
        alert('등록 실패');
        console.error(err);
      });
  };

  return (
    <div className="phon_size">

      <Header />

      <div className="scroll-area header-layout">
        <div className="community-write-container">
          <h2 className="community-title">커뮤니티 글쓰기</h2>
          <form onSubmit={handleSubmit} className="write-form">
            <label className="form-label">지역 선택</label>
            <select name="region" value={form.region} onChange={handleChange}>
              <option>전체지역</option>
              <option>서울특별시</option>
              <option>부산광역시</option>
              <option>대구광역시</option>
              <option>인천광역시</option>
              <option>광주광역시</option>
              <option>대전광역시</option>
              <option>울산광역시</option>
              <option>세종특별자치시</option>
              <option>강원특별자치도</option>
              <option>경기도</option>
              <option>충청북도</option>
              <option>충청남도</option>
              <option>전라남도</option>
              <option>전북특별자치도</option>
              <option>경상북도</option>
              <option>경상남도</option>
              <option>제주특별자치도</option>
            </select>

            <label className="form-label">제 목</label>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label className="form-label">내 용</label>
            <textarea
              name="content"
              placeholder="내용을 입력하세요"
              value={form.content}
              onChange={handleChange}
              required
              rows={10}
            />

            <button type="submit" className="submit-btn">등 록</button>
          </form>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default CommunityWrite;
