import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/youthboat.css';
import useFavorite from '../hooks/useFavorite';


const YouthBoat = () => {
  const pageTitle = '청년어선임대사업';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/pdf/어선청년임대사업 시행지침.pdf';
    link.download = '어선청년임대사업_시행지침.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="phon_size">
      <Header />

      <div className="scroll-area">
        <div className="boat-container">
          <h2 style={{ display: 'flex', justifyContent: 'space-between' }} className="page-title">
            청년 어선임대사업
            <button
              onClick={toggleFavorite}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '22px',
                color: '#f0c420',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}>{isFavorite ? '★' : '☆'}
            </button>
          </h2>

          <h3 className="section-hash">청년 어선임대사업</h3>

          <img
            src="/UIimages/어선임대.jpg"
            alt="청년 어선임대사업"
            className="boat-img"
          />

          <div className="boat-info">
            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원사업 개요</span><br />
              귀어 청년의 초기 장착비용 부담 완화를 위한 어선임대
            </p>
            <br />
            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 담당 기관 및 정책과</span><br />
              해양수산부 어업정책과 044-200-5510, 5518
            </p>
            <br />
            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원대상자</span><br />
              청년 어업희망인 (만 49세 이하 한국국적자)
            </p>
            <br />
            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원형태 및 유의사항</span><br />
              다음 하단의 각 세부 사항 참고
            </p>
            <br />
            <ul className="boat-note">
              <li><span className="dot"></span><span className="bold" style={{ color: '#3b82f6', fontSize: '15px' }}>지원사항<br /></span> 어선임대비 국비 50%, 청년자부담 50%</li>
              <li><span className="dot"></span><span className="bold" style={{ color: '#3b82f6', fontSize: '15px' }}>지원한도<br /></span> 어선 1척 당 월 최대 250만원 (국비 50%) 임대비 지원</li>
              <li><span className="dot"></span><span className="bold" style={{ color: '#3b82f6', fontSize: '15px' }}>기타조건<br /></span> 지원한도금액과 지원 후, 실제지원 예산이 남을 경우 해양수산부 협의 후 후속대응</li>
            </ul>
          </div>

          <button className="boat-btn" onClick={triggerDownload}>청년어선임대 안내</button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default YouthBoat;
