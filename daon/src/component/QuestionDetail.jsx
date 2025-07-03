import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = ({ user }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    alert('로그인 후 이용 가능합니다.');
    navigate('/login');
    return;
  }
  axios.get(`http://localhost:3003/api/question/${id}`)
    .then(res => {
      if (res.data.user_id !== user.user_id) {
        alert('본인만 열람 가능합니다.');
        navigate('/questions');
      } else {
        setQuestion(res.data);
      }
    }).catch(err => {
      alert('조회 실패');
      navigate('/questions');
    });
}, [id, user, navigate]);

  return (
    <div className="container">
      <h2>전문 정착상담사</h2>
      <h3>Q & A</h3>
      <h4>{question.question_title}</h4>
      <p>{question.user_id} · {new Date(question.created_at).toLocaleString()}</p>
      <p>{question.question}</p>
    </div>
  );
};

export default QuestionDetail;

QuestionDetail.jsx