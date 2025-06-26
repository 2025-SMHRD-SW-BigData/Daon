// ✅ components/PostDetail.jsx - 게시글 상세 보기 컴포넌트

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/communitypage.css';

const dummyPosts = [
  { id: '1', title: '귀어 창업 준비 중인데 궁금한 게 있어요!', author: '김어부', date: '2025.06.26', content: '귀어 창업 지원 정책이나 실제 경험 공유해주실 수 있나요?' },
  { id: '2', title: '장비 구매 어디서 하세요?', author: '박어민', date: '2025.06.25', content: '어업 장비 구매는 어디서 하면 좋을지 추천 부탁드립니다.' },
  { id: '3', title: '전복 양식 꿀팁 공유합니다', author: '최양식', date: '2025.06.24', content: '수온 관리랑 먹이 주는 주기 조절이 핵심입니다!' },
];

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = dummyPosts.find(p => p.id === id);

  if (!post) return <div style={{ padding: '16px' }}>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="community-container">
      <h2 className="community-title">게시글 상세보기</h2>
      <div className="post-card" style={{ cursor: 'default' }}>
        <div className="post-title">{post.title}</div>
        <div className="post-meta">{post.author} · {post.date}</div>
        <div style={{ marginTop: '12px', color: '#444' }}>{post.content}</div>
      </div>
      <button className="join-button" style={{ marginTop: '20px' }} onClick={() => navigate(-1)}>← 돌아가기</button>
    </div>
  );
};

export default PostDetail;
