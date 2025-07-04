import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/fish자격.css';
import '../style/main.css';
import useFavorite from '../hooks/useFavorite';

const Fish_fishingboat = () => {
  const pageTitle = '낚시어선업';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  return (
    <div className="phon_size fishingboat-page" style={{ display: 'flex', flexDirection: 'column', height: '844px' }}>
      <Header />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '100px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className="fish_qualification">
          어업 자격
          <button
            onClick={toggleFavorite}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: '#f0c420',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div className="hr_style">
          <hr />
        </div>

        <h2 className="fish_head"># 낚시어선업</h2>
        <p style={{ fontSize: '15px', padding: '10px 40px 0 40px', textAlign: 'left', lineHeight: '1.5' }}>
          낚시어선업이란 낚시 체험을 원하는 일반인을 태우고,<br />
          요금을 받고 바다에서 낚시 활동을 할 수 있도록<br />
          운영하는 업<br />
          관련 법에 따라 등록해야만 합법적으로 운영
        </p>

        <div style={{ padding: '20px 40px 0 40px', textAlign: 'left' }}>
          <p style={{ color: '#2167B8', fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>▼ 신청자격</p>
          <p style={{ marginLeft: '16px', marginBottom: '20px', fontSize: '15px' }}>누구나 신청 가능</p>

          <p style={{ color: '#2167B8', fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>▼ 신청방법</p>
          <p style={{ marginLeft: '16px', marginBottom: '20px', fontSize: '15px' }}>방문</p>

          <p style={{ color: '#2167B8', fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>▼ 처리기간</p>
          <p style={{ marginLeft: '16px', marginBottom: '20px', fontSize: '15px' }}>총 2일</p>

          <p style={{ color: '#2167B8', fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>▼ 제출 서류</p>
          <p style={{ marginLeft: '16px', marginBottom: '20px', fontSize: '15px', lineHeight: '1.5' }}>
            낚시어선업신고서 | 어선검사증서사본 | 해기사면허증사본<br />
            전문교육 이수증 | 설비 명세서 | 안전성 검사증서
          </p>

          <p style={{ color: '#2167B8', fontWeight: 'bold', fontSize: '17px', marginBottom: '10px' }}>▼ 신청방법 및 절차</p>

          <div
            style={{
              border: '1px solid #6CB8FF',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '30px',
              width: '300px'
            }}
          >
            <p>
              <span style={{ fontSize: '20px' }}>①</span> 접수 -{' '}
              <span style={{ color: '#6CB8FF', fontSize: '13px' }}>
                시 . 군 . 구, 특별자치도, 특별자치시
              </span>
            </p>
            <br />
            <p>
              <span style={{ fontSize: '20px' }}>②</span> 처리 -{' '}
              <span style={{ color: '#6CB8FF', fontSize: '13px' }}>
                시 . 군 . 구, 특별자치도, 특별자치시
              </span>
            </p>
          </div>

          <button
            className="pdf-btn"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/pdf/낚시어선업.pdf';
              link.download = '낚시어선업.pdf';
              link.click();
            }}
          >
            낚시어선업 신청서 다운
          </button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default Fish_fishingboat;