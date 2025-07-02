// src/component/PairTrawl.jsx
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import RecommendList from './RecommendList';
import '../style/pairtrawl.css';

const PairTrawl = () => {
  return (
    <div className="phon_size">
      <Header />

      <div className="scroll-area">
        <div className="pairtrawl-container">
          <h2 className="page-title">어선 정보</h2>
          <h3 className="section-hash">권현망어선</h3>

          <img
            src="/UIimages/권현망어선.jpg"
            alt="권현망어선"
            className="pairtrawl-img"
          />

          <div className="pairtrawl-info">
            <p>
              <span className="blue bold">▼ 방식</span><br />
              선단을 이루어 한 쌍의 어선이 그물 양쪽을 끌어당기며 조업
            </p>
            <p>
              <span className="blue bold">▼ 주요 어획 어종</span><br />
              멸치, 갈치, 전어 등
            </p>
            <p>
              <span className="blue bold">▼ 작업 해역</span><br />
              연근해 및 남해안 일대
            </p>

            {/* 추천 어항 리스트 삽입 */}
            <RecommendList vesselType="권현망" />
          </div>

          <button
            className="pairtrawl-btn"
            onClick={() => window.open('http://www.ksupk.or.kr/file/index.php', '_blank')}
          >
            구매 관련 사이트 이동하기
          </button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default PairTrawl;
