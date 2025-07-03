import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import NavBar from './NavBar';
import '../style/QuestionDetail.css';

const QuestionDetail = ({ user }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:3003/api/question/${id}`)
      .then(res => {
        if (String(res.data.user_id) !== String(user.user_id) && user.role !== 'counselor') {
          alert('열람 권한이 없습니다.');
          navigate('/questions');
        } else {
          setQuestion(res.data);
        }
      })
      .catch(err => {
        alert('조회 실패');
        navigate('/questions');
      });

    axios.get(`http://localhost:3003/api/answers/${id}`)
      .then(res => setAnswers(res.data))
      .catch(err => console.error('답변 불러오기 실패', err));
  }, [id, user, navigate]);

  const handleAnswerSubmit = () => {
    if (!answer.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }

    axios.post('http://localhost:3003/api/answer', {
      qna_id: question.qna_id,
      counselor_id: user.user_id,
      answer: answer
    }).then(res => {
      alert('답변 등록 완료!');
      setAnswer('');
      // 등록 후 답변 목록 갱신
      axios.get(`http://localhost:3003/api/answers/${id}`)
        .then(res => setAnswers(res.data))
        .catch(err => console.error('답변 불러오기 실패', err));
    }).catch(err => {
      alert('답변 등록 실패');
      console.error(err);
    });
  };

  if (!question) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="phon_size">
      <Header />

      <div className="qna-container">
        <div className="qna-label">전문 정착상담사</div>

        <div className="qna-title-box">
          <h2 className="qna-main-title">Q & A</h2>
          <button className="qna-write" onClick={() => navigate('/question/new')}>
            질문 등록
          </button>
        </div>

        <h3 className="question-title">{question.question_title}</h3>
        <p className="question-meta">
          {question.user_id} · {new Date(question.created_at).toLocaleString()}
        </p>

        <hr className="qna-divider" />

        <p className="question-content">{question.question}</p>

        <hr className="qna-divider" />

        {user.role === 'counselor' && (
          <div className="answer-box">
            <textarea
              className="answer-input"
              placeholder="답변을 입력해주세요"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button className="answer-submit" onClick={handleAnswerSubmit}>
              답변 등록
            </button>
          </div>
        )}

        <div className="answer-list" style={{ marginTop: '30px' }}>
          <h4>📬 등록된 답변</h4>
          {answers.length === 0 ? (
            <p>아직 답변이 없습니다.</p>
          ) : (
            answers.map(ans => (
              <div key={ans.answer_id} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9'
              }}>
                <p><b>🧑‍💼 {ans.nickname} 상담가</b></p>
                <p style={{ whiteSpace: 'pre-wrap' }}>{ans.answer}</p>
                <p style={{ fontSize: '12px', color: '#999', textAlign: 'right' }}>
                  {new Date(ans.answer_at).toLocaleString()}
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

export default QuestionDetail;