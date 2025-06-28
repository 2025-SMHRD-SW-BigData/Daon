import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitypage.css'; // 댓글 스타일도 여기서 공유 가능

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  // 댓글 목록 상태
  const [comments, setComments] = useState([
    { id: 1, author: '댓글러1', content: '좋은 글 감사합니다.' },
    { id: 2, author: '댓글러2', content: '저도 같은 고민이에요!' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: '익명', // 추후 로그인 연동 가능
      content: commentInput.trim()
    };

    setComments(prev => [...prev, newComment]);
    setCommentInput('');
  };

  if (!post) {
    return <div>게시글 정보가 없습니다.</div>;
  }

  return (
    <div className="phon_size">
      <div className="scroll-area">
        <Header />
        <div className="community-container">
          <h2 className="community-title">{post.title}</h2>
          <br></br>
          <div className="post-meta">{post.author} · {post.date}</div>
          <br></br>
          <p style={{
            margin: '16px 0',
            textAlign: 'left',         // 가운데 정렬 → 왼쪽 정렬
            lineHeight: '1.6',
            fontSize: '15px',
            color: '#333'
          }}>{post.content || '내용 없음'}</p>

          <hr />

          {/* 댓글 목록 */}
          <div style={{ marginTop: '20px' }}>
            {comments.length === 0 ? (
              <p style={{ color: '#999' }}>아직 댓글이 없습니다.</p>
            ) : (
              <ul style={{ padding: 0, listStyle: 'none' }}>
                {comments.map((comment) => (
                  <li key={comment.id} style={{
                    padding: '12px 14px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    marginBottom: '12px',
                    lineHeight: '1.7',
                  }}>
                    <strong style={{ display: 'block', marginBottom: '6px' }}>{comment.author}</strong>
                    <span>{comment.content}</span>
                  </li>
                ))}
              </ul>

            )}
          </div>

          {/* 댓글 작성 */}
          <div style={{ marginTop: '16px' }}>
            <textarea
              rows="3"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="댓글을 입력하세요"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                resize: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleCommentSubmit}
              style={{
                marginTop: '8px',
                padding: '8px 16px',
                backgroundColor: '#66A5ED',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              댓글 등록
            </button>
          </div>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default PostDetail;
