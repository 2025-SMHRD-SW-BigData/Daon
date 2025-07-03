// ✅ 수정된 QuestionList.jsx (localhost 기반)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import '../style/QuestionList.css';

const QuestionList = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  if (!user) return;

  // 임시로 role 강제 주입해서 테스트
  const role = user.role || 'counselor'; // 👈 테스트용

  const url = `http://localhost:3003/api/questions?user_id=${user.user_id}&role=${role}`;
  console.log('📡 요청 URL:', url);

  fetch(url)
    .then(res => res.json())
    .then(data => setQuestions(Array.isArray(data) ? data : []))
    .catch(err => {
      console.error(err);
      setQuestions([]);
    });
}, [user]);

  return (
    <div className="phon_size">
      <Header />
      <div className="qna-container">
        <div className="qna-label">전문 정착상담사</div>

        <div className="qna-title-box">
          <h2 style={{ textAlign: 'left', color: '#1f4fa3', marginLeft: '27px' }}>Q & A</h2>
          <button className="qna-write" onClick={() => navigate('/question/new')}>
            질문 등록
          </button>
        </div>

        <div className="qna-list">
          {questions.length === 0 ? (
            <p className="qna-empty">등록된 질문이 없습니다.</p>
          ) : (
            questions.map((q) => (
              <div
                key={q.qna_id}
                className="qna-item"
                onClick={() => navigate(`/question/${q.qna_id}`)}
              >
                <p className="qna-title">{q.question_title}</p>
                <p className="qna-meta">
                  {new Date(q.created_at).toISOString().split('T')[0]} | {q.user_id}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default QuestionList;