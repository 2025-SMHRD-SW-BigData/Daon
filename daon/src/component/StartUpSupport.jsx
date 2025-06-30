// StartUpSupport.jsx - 귀어 창업지원 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/startupsupport.css';

const StartUpSupport = () => {
  return (
    <div className="phon_size">
      <Header />

      <div className="scroll-area">
        <div className="startup-container">
          <h2 className="page-title">귀어 창업지원</h2>
          <h3 className="section-hash">귀어 창업</h3>

          <img
            src="/UIimages/귀어창업지원.png"
            alt="귀어 창업지원"
            className="startup-img"
          />

          <div className="startup-info">
            <p><span className="blue bold">▼ 지원사업 개요</span><br />
              신규 귀어인이 어업 창업을 할 수 있도록 초기 자금 지원
            </p>

            <p><span className="blue bold">▼ 지원금액</span><br />
              최대 3억 원 이내의 창업자금을 1.5% 고정 금리,<br />
              5년 거치 + 10년 분할 상환
            </p>

            <p><span className="blue bold">▼ 지원조건</span><br />
              "귀어 창업 교육" 35시간 이상 반드시 이수 후 신청서 제출
            </p>

            <p><span className="blue bold">▼ 모집시기</span><br />
              25년도 기준 1월과 7월 연 2회 모집. 유 교육 이수 必
            </p>

            <p><span className="blue bold">▼ 선발 절차</span></p>
            <ul className="startup-note">
              <li><span className="dot">▪</span> 서류심사 및 금융 심사로 대상자 선정</li>
              <li><span className="dot">▪</span> 자체 심사위원회에서 심층 심사, 면접</li>
              <li><span className="dot">▪</span> 심사 통과 시 지원 대상 대출</li>
            </ul>

            <p><span className="blue bold">▼ 기타 조건</span><br />
              창업 후 진정한 "어촌 거주 및 사업" 유지<br />
              자체 관련 업계 지원 시책 참고<br />
              다른 정부 창업지원사업과 중복 수혜 제한
            </p>
          </div>

          <button className="startup-btn">창업지원 사이트 이동하기</button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default StartUpSupport;
