import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitypage.css';



const CommunityPage = () => {
  const [posts, setPosts] = useState([]); // 서버에서 받아온 게시글 상태
  const [region, setRegion] = useState('전체지역');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ✅ 로그인 여부 확인


  // 서버에서 게시글 데이터 불러오기 (컴포넌트 마운트 시)
  useEffect(() => {
    axios
      .get('http://192.168.219.45:3003/community/view') // 서버 API 주소에 맞게 변경
      .then(res => {
        // console.log('데이터 받아오는중')
        setPosts(res.data);
      })
      .catch(err => {
        console.error('게시글 불러오기 실패:', err);
      });
  }, []);

  // 지역 필터링
  const filteredPosts = region === '전체지역'
    ? posts
    : posts.filter((p) => p.region === region);

  // 페이징 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };
  // 글쓰기 버튼 클릭 시
   const handleWriteClick = () => {
    if (!user) {
      alert('로그인 후 글쓰기가 가능합니다.');
      navigate('/login')
    } else {
      navigate('/community/write');
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="phon_size">
      <div className="scroll-area">
        <Header />
        <div className="community-container">
          <div className="community-header">
            <h2 className="community-title">커뮤니티 게시판</h2>
            <select
              className="region-select"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>전체지역</option>
              <option>서울특별시</option>
              <option>부산광역시</option>
              <option>대구광역시</option>
              <option>인천광역시</option>
              <option>광주광역시</option>
              <option>대전광역시</option>
              <option>울산광역시</option>
              <option>세종특별자치시</option>
              <option>강원특별자치도</option>
              <option>경기도</option>
              <option>충청북도</option>
              <option>충청남도</option>
              <option>전라남도</option>
              <option>전북특별자치도</option>
              <option>경상북도</option>
              <option>경상남도</option>
              <option>제주특별자치도</option>
            </select>
          </div>

          <ul className="post-list">
            {currentPosts.length === 0 ? (
              <div className="no-post">게시글이 없습니다.</div>
            ) : (
              currentPosts.map((post) => (
                <li
                  key={post.post_id} // DB 컬럼명에 맞게 post_id로 변경
                  className="post-card"
                  onClick={() => navigate(`/community/${post.post_id}`, { state: { post } })}
                >
                  <div className="post-title">{post.title}</div>
                  <div className="post-meta">{post.user_id} · {post.region} · {new Date(post.created_at).toLocaleDateString()}</div>
                </li>
              ))
            )}
          </ul>

          {/* 페이지네이션 UI */}
          {totalPages > 1 && (
            <div className="pagination">
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageClick(num)}
                  className={num === currentPage ? 'active' : ''}
                >
                  {num}
                </button>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button onClick={handleWriteClick} className="primary-button">
              글쓰기
            </button>
          </div>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default CommunityPage;
