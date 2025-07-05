import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import NavBar from './NavBar';
import '../style/QuestionForm.css';

const QuestionForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('로그인 후 질문을 등록할 수 있습니다.');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3003/api/questions', {
      question_title: title,
      question: content,
      user_id: user.user_id,
    })
    .then(res => {
      console.log('[QuestionForm] 질문 등록 성공:', res.data);
      navigate('/questions');
    })
    .catch(err => {
      console.error('[QuestionForm] 질문 등록 에러:', err);
    });
  };

  if (!user) return null;

  return (
    <div className="phon_size">
      <div className="header-fixed">
        <Header />
      </div>

      <div className="main-content">
        <div className="form-container">
          <h2 className="form-title">전문 정착상담사</h2>
          <h3 className="form-subtitle">Q & A</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>제목 :</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>내용 :</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </div>
            <button type="submit">질문 등록</button>
          </form>
        </div>
      </div>

      <div className="navbar-fixed">
        <NavBar />
      </div>
    </div>
  );
};

export default QuestionForm;