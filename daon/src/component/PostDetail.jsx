import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🔽 추가
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitypage.css';

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  const [comments, setComments] = useState([]); // 🔽 DB에서 받아올 댓글
  const [commentInput, setCommentInput] = useState('');

  // ✅ 댓글 불러오기 (컴포넌트 마운트 시 1회)
  useEffect(() => {
    if (!post?.post_id) return;

    axios
      .get(`http://localhost:3003/community/comments/${post.post_id}`)
      .then((res) => setComments(res.data))
      .catch((err) => {
        console.error('댓글 불러오기 실패:', err);
      });
  }, [post?.post_id]);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      post_id: post.post_id, // 🔽 어떤 게시글의 댓글인지 식별
      author: '익명', // 나중에 로그인 유저명으로 대체
      content: commentInput.trim(),
    };

    axios
      .post('http://localhost:3003/community/comments', newComment)
      .then(() => {
        // 🔁 댓글 새로고침
        return axios.get(`http://localhost:3003/community/comments/${post.post_id}`);
      })
      .then((res) => {
        setComments(res.data);
        setCommentInput('');
      })
      .catch((err) => {
        console.error('댓글 등록 실패:', err);
      });
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
          <br />
          <div className="post-meta">{post.author} · {post.date}</div>
          <br />
          <p style={{
            margin: '16px 0',
            textAlign: 'left',
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
                  <li key={comment.comment_id} style={{
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
