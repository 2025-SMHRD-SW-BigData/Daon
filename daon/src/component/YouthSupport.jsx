import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/YouthSupport.css';
import useFavorite from '../hooks/useFavorite';


const YouthSupport = () => {
  const pageTitle = '청년어촌정착지원';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/pdf/청년어촌정착지원사업.pdf';
    link.download = '청년어촌정착지원사업.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="phon_size">
      <Header />
      <div className="scroll-area">
        <div className="support-container">
          <h2 className="page-title" style={{display:'flex',justifyContent:'space-between'}}>
            청년어촌정착지원 사업
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

          <img
            src="/UIimages/청년어촌정착.png"
            alt="청년어촌정착지원"
            className="support-img"
          />

          <div className="support-text">
            <p><span className="highlight" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원사업 개요</span><br />
              창업 초기의 청년 수산업 경영인의 안정적 어촌 정착
            </p><br />

            <p><span className="highlight" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원금액</span><br />
              1, 2, 3년차별: 월 110만, 100만, 90만 지급
            </p><br />

            <p><span className="highlight" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원조건</span><br />
              어촌지역에 실제 거주하며 사업을 운영
            </p><br />

            <p><span className="highlight" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 모집시기</span><br />
              25년도 기준 10월 ~ 12월, 지자체별 상이
            </p><br />

            <p><span className="highlight" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원대상</span><br />
              만 18세 이상 ~ 만 40세 미만, 수산업 경영경력 3년 이하
            </p><br />

            <p><span className="highlight" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 기타조건</span><br />
              <span style={{ fontWeight: 'bold' }}> 거주 유지 의무:</span> 지원 기간 실제 거주 必<br /><br />
              행정 · 지자체 <span style={{ fontWeight: 'bold' }}> 예산 분담 및 환수 규정</span> 등 <br />
              사후 처리체계 및 갱신되는 정보에 유의
            </p>

            <button className="apply-button" onClick={triggerDownload}>
              청년어촌정착지원사업 안내
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default YouthSupport;
