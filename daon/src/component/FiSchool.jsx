import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/fischool.css';
import useFavorite from '../hooks/useFavorite';

const FiSchool = () => {
  const pageTitle = '면허어업';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/pdf/귀어학교_시행지침.pdf';
    link.download = '귀어학교_시행지침.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="phon_size">
      <Header />

      <div className="scroll-area">
        <div className="school-container" >
          <div style={{display:'flex',justifyContent:'space-between'}}>

            <h2 className="page-title">귀어학교</h2>
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
          </div>
          <hr />
          <h3 className="section-hash">귀어가 체질</h3>

          <img
            src="/UIimages/귀어학교.jpg"
            alt="귀어학교지원"
            className="school-img"
          />

          <div className="school-info">
            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 지원 자격 및 대상자</span><br />
              사업 공고 기준 만 18세 이상 ~ 만 65세 이하
            </p>

            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 교육 기관 및 교육 내용</span><br />
              전국 8개 지자체 및 한국어촌어항공단
            </p>

            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 신청 방법 및 절차</span><br />
              각 지자체 교육 신청 및 계획서 제출, 실사 평가 후 일정안내
            </p>

            <p><span className="blue bold" style={{ fontSize: '15px' }}><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 유의사항</span><br />
              다음 하단의 세부 사항 참고
            </p>

            <ul className="school-note">
              <li><span className="dot">▪</span> <span className="bold" style={{ color: '#3b82f6', fontSize: '15px' }}>자부담금 <br /></span> 자격증 취득 과정은 교육비 절반 자부담</li>
              <li><span className="dot">▪</span> <span className="bold" style={{ color: '#3b82f6', fontSize: '15px' }}>지원 한도<br /></span> 일부 지자체 기준 국내 200만원을 초과한 지원 불가</li>
              <li><span className="dot">▪</span> <span className="bold" style={{ color: '#3b82f6', fontSize: '15px' }}>각 서류 제출 유의<br /></span> 자격증보단 정착지원 신청 시, 별도 신청 서류 유의</li>
            </ul>
          </div>

          <button className="school-btn" onClick={triggerDownload}>귀어학교 지원 안내</button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default FiSchool;
