import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/communitypage.css';
import Header from './Header';
import NavBar from './NavBar';

const dummyPosts = [
  {
    id: 1,
    title: '귀어 창업 준비 중인데 궁금한 게 있어요!',
    author: '김어부',
    date: '2025.06.26',
    region: '전라남도',
  },
  {
    id: 2,
    title: '장비 구매 어디서 하세요?',
    author: '박어민',
    date: '2025.06.25',
    region: '경상북도',
  },
  {
    id: 3,
    title: '전복 양식 꿀팁 공유합니다',
    author: '최양식',
    date: '2025.06.24',
    region: '전라남도',
  },
];

const regions = [
  '전체지역', '강원도', '경기도', '경상남도', '경상북도',
  '광주광역시', '대구광역시', '대전광역시', '부산광역시',
  '서울특별시', '세종특별자치시', '울산광역시', '인천광역시',
  '전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도'
];

const CommunityPage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('전체지역');

  const filteredPosts = selectedRegion === '전체지역'
    ? dummyPosts
    : dummyPosts.filter(post => post.region === selectedRegion);

  return (
    <div className="screen-container">
      <div className="scroll-area">
        <Header />

        <div className="community-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            <h2 className="community-title" style={{ margin: 0 }}>커뮤니티 게시판</h2>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            >
              {regions.map((region, idx) => (
                <option key={idx} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <ul className="post-list">
            {filteredPosts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888' }}>해당 지역의 게시글이 없습니다.</p>
            ) : (
              filteredPosts.map(post => (
                <li
                  key={post.id}
                  className="post-card"
                  onClick={() => navigate(`/community/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="post-title">{post.title}</div>
                  <div className="post-meta">
                    <span>{post.author}</span> · <span>{post.date}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <NavBar />
      </div>
    </div>
  );
};

export default CommunityPage;
