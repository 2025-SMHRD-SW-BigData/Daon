import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/QuestionForm.css';

const QuestionForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  if (!user) return <p>로그인 후 질문을 등록할 수 있습니다.</p>;

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log('[QuestionForm] 질문 등록 요청 보냄:', { title, content, user_id: user.user_id });

  axios.post('http://localhost:3003/api/questions', {
  question_title: title,
  question: content,
  user_id: user.user_id
})
  .then(res => {
    console.log('[QuestionForm] 질문 등록 성공:', res.data);
    navigate('/questions');
  })
  .catch(err => {
    console.error('[QuestionForm] 질문 등록 에러:', err);
  });
};

  return (
    <div className="container">
      <h2>전문 정착상담사</h2>
      <h3>Q & A</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목 :</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>내용 :</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} required />
        </div>
        <button type="submit">질문 등록</button>
      </form>
    </div>
  );
};

export default QuestionForm;