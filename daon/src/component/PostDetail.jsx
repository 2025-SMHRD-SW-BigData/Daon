import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import axios from 'axios'; // 🔽 추가
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitypage.css';

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;
  console.log(post)

  const [comments, setComments] = useState([]); // 🔽 DB에서 받아올 댓글
  const [commentInput, setCommentInput] = useState('');
  const { user, setUser } = useContext(UserContext) //로그인한 사람 아이디

  // console.log(user)
  // ✅ 댓글 불러오기 (컴포넌트 마운트 시 1회)
  useEffect(() => {
    if (!post?.post_id) return;

    axios
      .get(`http://localhost:3003/community/comments/${post.post_id}`)
      .then((res) => {
        setComments(res.data)
        // console.log(res.data)
      })

      .catch((err) => {
        console.error('댓글 불러오기 실패:', err);
      });
  }, [post?.post_id]);

  const handleCommentSubmit = () => {
    if (!user) {
      alert('댓글을 작성하려면 로그인이 필요합니다.');
      return;
    }
    if (!commentInput.trim()) return;

    const newComment = {
      post_id: post.post_id, // 🔽 어떤 게시글의 댓글인지 식별
      user_id: user.user_id, // 나중에 로그인 유저명으로 대체
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

  //게시글 삭제하는 핸들러
  const handlerDeletePost = () => {
    const confirmDelete = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3003/community/delete/${post.post_id}`)
      .then((res) => {
        alert('게시글이 삭제되었습니다.');
        navigate('/community'); // 삭제 후 목록으로 이동
      })
      .catch((err) => {
        console.error('게시글 삭제 실패:', err);
        alert('게시글 삭제에 실패했습니다.');
      });
  }

  return (
    <div className="phon_size">
        <Header />
      <div className="scroll-area">
        <div className="community-container">
          <h2 className="community-title">{post.title}</h2>
          <div className="post-meta">{post.user_id} · {new Date(post.created_at).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}</div>
          <hr />

          <br />
          <p style={{
            margin: '16px 0',
            textAlign: 'left',
            lineHeight: '1.6',
            fontSize: '15px',
            color: '#333',
            whiteSpace:'pre-line'
          }}>{post.content || '내용 없음'}</p>

          <hr />
          {/* 로그인한 사람id와 게시글 작성자 id가 같으면 */}
          {user && user.user_id === post.user_id && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span
                onClick={handlerDeletePost}
                style={{
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize : '12px'
                }}
              >
                글삭제 ❌
              </span>
            </div>
          )}
  댓글
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
                    whiteSpace:'pre-line',
                  }}>
                    <strong style={{ display: 'block', marginBottom: '6px' }}>{comment.nickname}</strong>
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
            <br />
            <button
              onClick={() => { navigate('/community') }}
              style={{
                marginTop: '8px',
                padding: '8px 16px',
                backgroundColor: '#995A12',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              목록
            </button>
          </div>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default PostDetail;
