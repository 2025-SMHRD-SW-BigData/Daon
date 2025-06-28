// ✅ CommunityPage.jsx - 페이징 기능 적용 버전

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommunityContext } from '../context/CommunityContext';
import Header from './Header';
import NavBar from './NavBar';
import '../style/communitypage.css';

const CommunityPage = () => {
  const { posts } = useContext(CommunityContext);
  const [region, setRegion] = useState('전체지역');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const navigate = useNavigate();

  const filteredPosts = region === '전체지역'
    ? posts
    : posts.filter((p) => p.region === region);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
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
                  key={post.id}
                  className="post-card"
                  onClick={() => navigate(`/community/${post.id}`, { state: { post } })}
                >
                  <div className="post-title">{post.title}</div>
                  <div className="post-meta">{post.author} · {post.date}</div>
                </li>
              ))
            )}
          </ul>

          {/* ✅ 페이지네이션 UI */}
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
            <button onClick={() => navigate('/community/write')} className="primary-button">
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
