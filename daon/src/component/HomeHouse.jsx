import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/homehouse.css';

const HomeHouse = () => {
  const triggerDownload = () => {
  const link = document.createElement('a');
  link.href = '/pdf/귀어인의집_시행지침.pdf'; // PUBLIC_URL 없이 간단하게
  link.setAttribute('download', '귀어인의집_시행지침.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  return (
    <div className="phon_size">
      <Header />
      <div className="scroll-area">
        <div className="house-container">
          <h2 className="page-title" style={{ fontSize: '19px' }}>지원금 및 정책</h2>
          <hr />
          <h3 className="section-hash" style={{ fontSize: '24px', fontWeight: 'revert' }}># 귀어인의 집</h3>

          <img
            src="/UIimages/귀어인의집.jpg"
            alt="귀어인의 집"
            className="house-img"
          />

          <div className="house-box">
            <p style={{ marginBottom: '15px' }}>
              <span className="bold blue">대상 :</span> 어촌 이주를 희망하는 귀어인
            </p>
            <p style={{ marginBottom: '15px' }}>
              <span className="bold blue">내용 :</span> 1년간 임대 숙소 제공<br /> (월 약 20만 원, 공과금 별도)
            </p>
            <p>추가 이용자가 없을 경우엔 <span className="blue underline">연장도 가능</span></p>

            <p className="house-desc">
              <span className="blue">귀어귀촌 희망자</span>들이 1년간 어려움을 겪는 <span className="blue">주거문제</span>를 해결<br />
              <span className="blue">1년간</span> 어촌 일을 직접 배우면서 <span className="blue">귀어</span>를 결정할 수 있어요
            </p>
          </div>

          <button className="house-btn" onClick={triggerDownload}>
            시행지침 안내
          </button>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default HomeHouse;
