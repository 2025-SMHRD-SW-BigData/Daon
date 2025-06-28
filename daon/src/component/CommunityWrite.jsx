import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommunityContext } from '../context/CommunityContext';
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitywrite.css';

const CommunityWrite = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(CommunityContext);
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    region: '전체지역',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');

    addPost({
      ...form,
      date: today,
    });

    alert('게시글이 등록되었습니다.');
    navigate('/community');
  };

  return (
    <div className="phon_size"> {/* ✅ 모바일 고정 사이즈 컨테이너 */}
      <div className="scroll-area">
        <Header />
        <div className="community-write-container">
          <h2 className="community-title">글쓰기</h2>

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

          <form onSubmit={handleSubmit} className="write-form">
            <input type="text" name="title" placeholder="제목" value={form.title} onChange={handleChange} required />
            <textarea name="content" placeholder="내용" value={form.content} onChange={handleChange} required rows={6} />
            <input type="text" name="author" placeholder="작성자" value={form.author} onChange={handleChange} required />
            <button type="submit" className="submit-btn">등록</button>
          </form>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default CommunityWrite;
