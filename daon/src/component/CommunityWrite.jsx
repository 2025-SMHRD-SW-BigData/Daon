import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommunityContext } from '../context/CommunityContext'; // 추가
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitywrite.css';

const CommunityWrite = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(CommunityContext); // 추가
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
    <div className="phon_size">
      <div className="phon_size">
        <Header />
        <div className="phon_size">
          <h2 className="community-title">글쓰기</h2>

          <select name="region" value={form.region} onChange={handleChange}>
            <option>전체지역</option>
            
          </select>
          
          
          <br></br>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
