// PairTrawl.jsx - 권현망어선 소개 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
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
            <p><span className="blue bold">▼ 방식</span><br />
              선단을 구축 및 협력하여 긴 그물을 펼쳐 어군을 포위하여 포획
            </p>

            <p><span className="blue bold">▼ 주요 어획 어종</span><br />
              멸치를 집중포획, 그물망이므로 기타 어종 혼획
            </p>

            <p><span className="blue bold">▼ 작업 해역</span><br />
              남해안 근해
            </p>

            <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
              본선 30톤 이하 및 규정상 등록 제한 / 단, 다양한 부속선 동원
            </p>

            <p><span className="blue bold">▼ 특징</span><br />
              선단 구성으로 앞/옆에서 그물로 끌어 포획
            </p>

            <p><span className="blue bold">▼ 필요 장비</span></p>
            <ul className="pairtrawl-note">
              <li><span className="dot">▪</span> <b>피쉬펌프 :</b> 그물에서 자동화 흡입선별. 대형 그물에 효과적</li>
              <li><span className="dot">▪</span> <b>대형 선망 윈치 :</b> 유압식으로 대규모 그물을 안정적으로 회수</li>
              <li><span className="dot">▪</span> <b>클러치 :</b> 그물이 선미 등에 걸리지 않게 돕는 유압 클러치</li>
              <li><span className="dot">▪</span> <b>전자장비 :</b> 어군감지기, 소나 등</li>
            </ul>
          </div>

          <button className="pairtrawl-btn">구매 관련 사이트 이동하기</button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default PairTrawl;
