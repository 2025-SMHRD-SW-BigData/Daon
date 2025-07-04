// ✅ Fish_licensedfishery.jsx - 면허어업 정보 페이지 (Header 개선 통합본)
import React from 'react';
import Header from './Header';
import '../style/fish자격.css';
import '../style/main.css';
import NavBar from './NavBar';
import useFavorite from '../hooks/useFavorite';

const Fish_licensedfishery = () => {
  const pageTitle = '면허어업';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  return (
    <div className="phon_size">
      {/* ✅ 고정 Header */}
      <Header />

      {/* ✅ 스크롤 가능한 콘텐츠 영역 */}
      <div className="scroll-area">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='fish_qualification'>어업 자격</div>
          <button
            onClick={toggleFavorite}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: '#f0c420',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}>
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div className='hr_style'><hr /></div>
        <h2 className='fish_head'># 면허어업</h2>

        <p style={{ fontSize: '15px', padding: '10px 0 0 50px', textAlign: 'left' }}>
          일정 지역에 고정된 구조물(예:양식장,정착망 등)을<br />
          설치해 지속적인 어업을 할 경우 독점적 권리를 부여받는 면허
        </p>

        <br />
        <p className='fish_body_font'><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>신청자격</p>
        <p style={{ padding: '10px 0 20px 50px', textAlign: 'left', fontSize: '15px' }}>누구나 신청 가능</p>

        <p className='fish_body_font'><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>신청방법</p>
        <p style={{ padding: '10px 0 20px 50px', textAlign: 'left', fontSize: '15px' }}>인터넷, 방문, FAX, 우편</p>

        <p className='fish_body_font'><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>처리기간</p>
        <p style={{ padding: '10px 0 20px 50px', textAlign: 'left', fontSize: '15px' }}>총 7일</p>

        <p className='fish_body_font'><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>제출 서류</p>
        <p style={{ padding: '10px 0 20px 50px', textAlign: 'left', fontSize: '15px' }}>
          면허를 받으려는 수면의 위치 및 구역도 1부
        </p>

        <p className='fish_body_font'><span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>신청방법 및 절차</p>
        <div style={{
          border: '1px solid #6CB8FF',
          borderRadius: '8px',
          padding: '12px',
          margin: '20px 30px 30px 30px',
          width: '300px'
        }}>
          <p><span style={{ fontSize: '20px' }}>①</span> 접수 - <span style={{ color: '#6CB8FF', fontSize: '13px' }}>시 . 군 . 구</span></p>
          <br />
          <p><span style={{ fontSize: '20px' }}>②</span> 협의 - <span style={{ color: '#6CB8FF', fontSize: '13px' }}>군부대, 문화재관리국<br />지방국토관리청, 지방해양수산청</span></p>
          <br />
          <p><span style={{ fontSize: '20px' }}>③</span> 처리 - <span style={{ color: '#6CB8FF', fontSize: '13px' }}>시 . 군 . 구</span></p>
        </div>

        <button className='pdf-btn'
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/pdf/면향어업.pdf';
            link.download = '면향어업.pdf';
            link.click();
          }}
        >
          어업 면허 신청서 다운
        </button>
      </div>

      {/* ✅ 고정 NavBar */}
      <NavBar />
    </div>
  );
};

export default Fish_licensedfishery;
