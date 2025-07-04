import React, { useState, useEffect } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/homehouse.css';
import useFavorite from '../hooks/useFavorite';

const HomeHouse = () => {
  const pageTitle = '귀어인의 집';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  
  return (
    <div className="phon_size">
      <Header />
      <div className="scroll-area">
        <div className="house-container">
          {/* 제목 + 즐겨찾기 버튼 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '10px',
              marginBottom: '5px'
            }}
          >
            <h2 className="page-title" style={{ fontSize: '19px', margin: 0 }}>
              지원금 및 정책
            </h2>
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
          <h3 className="section-hash" style={{ fontSize: '24px', fontWeight: 'revert' }}># 귀어인의 집</h3>

          <img
            src="/UIimages/귀어인의집.jpg"
            alt="귀어인의 집"
            className="house-img"
          />

          <div className="house-box">
            <p style={{ marginBottom: '15px' }}><span className="bold blue" >대상 :</span> 어촌 이주를 희망하는 귀어인</p>
            <p style={{ marginBottom: '15px' }}><span className="bold blue">내용 :</span> 1년간 임대 숙소 제공<br /> (월 약 20만 원, 공과금 별도)</p>
            <p>추가 이용자가 없을 경우엔 <span className="blue underline">연장도 가능</span></p>

            <p className="house-desc">
              <span className="blue">귀어귀촌 희망자</span>들이 1년간 어려움을 겪는 <span className="blue">주거문제</span>를 해결<br />
              <span className="blue">1년간</span> 어촌 일을 직접 배우면서 <span className="blue">귀어</span>를 결정할 수 있어요
            </p>
          </div>

          <button className="house-btn">지원 하기</button>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default HomeHouse;
