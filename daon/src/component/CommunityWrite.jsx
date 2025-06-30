import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitywrite.css';

const CommunityWrite = () => {
  const navigate = useNavigate();

  // 게시글 입력 상태값
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '', // 나중에 로그인된 사용자 이름으로 대체 예정
    region: '전체지역',
  });

  // 입력값 변경 시 실행
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 시 실행
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
  }


  return (
    <div className="phon_size">
      <div className="scroll-area">
        <Header />

        <div className="community-write-container">
          <h2 className="community-title">글쓰기</h2>

          {/* 지역 선택 */}

          {/* 글쓰기 폼 */}
          <form onSubmit={handleSubmit} className="write-form">
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
            <input
              type="text"
              name="title"
              placeholder="제목"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="content"
              placeholder="내용"
              value={form.content}
              onChange={handleChange}
              required
              rows={6}
            />
            <input
              type="text"
              name="author"
              placeholder="작성자"
              value={form.author}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">등록</button>
          </form>
        </div>

        <NavBar />
      </div>
    </div>
  );
};

export default CommunityWrite;
