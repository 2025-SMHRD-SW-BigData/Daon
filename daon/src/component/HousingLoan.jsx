// HousingLoan.jsx - 주택구입자금지원 소개 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/housingloan.css';

const HousingLoan = () => {
  return (
    <div className="phon_size">
      <Header />

      <div className="scroll-area">
        <div className="loan-container">
          <h2 className="page-title">귀어인 주택구입자금지원</h2>
          <h3 className="section-hash">주택구입 지원</h3>

          <img
            src="/UIimages/주택구입 지원.jpg"
            alt="주택구입자금지원"
            className="loan-img"
          />

          <div className="loan-info">
            <p><span className="blue bold"style={{fontSize:'15px'}}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원사업 개요</span><br />
              귀어인의 주택 구입, 신축, 또는 리모델링 지원
            </p>
<br />
            <p><span className="blue bold"style={{fontSize:'15px'}}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원금액</span><br />
              최대 7,500만 원 한도로, 연 1.5% 고정금리
            </p>
<br />
            <p><span className="blue bold"style={{fontSize:'15px'}}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원조건</span><br />
              귀어창업과 동일, 귀어 창업교육(35시간) 이수
            </p>
<br />
            <p><span className="blue bold"style={{fontSize:'15px'}}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 모집시기</span><br />
              기준 1월과 7월 연 2회 모집. 위 교육 이수 必
            </p>
<br />
            <p><span className="blue bold"style={{fontSize:'15px'}}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 선발 절차</span><br />
              • 서류심사 및 금융 심사로 대상자 선정<br />
              • 자체 심사위원회에서 신청 심사, 면접<br />
              • 심사 승인 시 자금 대출
            </p>
<br />
            <p><span className="blue bold"style={{fontSize:'15px'}}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 기타 조건</span><br />
              • 거주 의무: 대출 후 일정 기간 어촌 정착 거주 必<br />
              • <span style={{fontWeight:'bold'}}>창업지원 관련 연계 사업 참조</span><br />
              • 다른 정부 금융지원사업과 중복 수혜 제한
            </p>
          </div>

          <button className="loan-btn">주택지원 관련 사이트 이동</button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default HousingLoan;
