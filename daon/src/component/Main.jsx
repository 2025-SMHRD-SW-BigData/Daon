import React from 'react'
import '../style/main.css'
import map from '../assets/map.png'
import comu from '../assets/comu.png'
import Header from './Header'
import NavBar from './NavBar'

const Main = () => {
  return (
    <div
      style={{
        width: '390px',
        height: '844px',
        margin: '0 auto',
        borderRadius: '24px',
        border: '1px solid #ccc',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 스크롤 가능한 전체 영역 (Header 포함) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          paddingBottom: '76px', // NavBar 높이 만큼 여백 확보
          boxSizing: 'border-box'
        }}
      >
        {/* 상단 Header - 고정 아님 */}
        <Header />

        {/* 검색창 */}
        <div className="search-box" style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="검색창"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        {/* 지도 이미지 */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          marginBottom: '20px'
        }}>
          <img src={map} alt="map"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            어촌 정보 탐색 지도
          </div>
        </div>

        {/* 정보 카드 4개 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          backgroundColor: 'rgb(102,165,237)',
          padding: '12px',
          borderRadius: '20px',
          marginBottom: '20px'
        }}>
          {[
            '어업 창업 정보 열람',
            '자격증 교육 정보',
            '어업 장비 정보',
            '정착 지원 정보'
          ].map((text, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '16px',
              color: 'rgb(102,165,237)',
              height: '80px',
              textAlign: 'center',
              padding: '8px'
            }}>
              {text}
            </div>
          ))}
        </div>

        {/* 커뮤니티 섹션 */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '120px',
          marginBottom: '20px'
        }}>
          <img src={comu} alt="커뮤니티"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              border: '1px solid black',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgb(102,165,237)',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            커뮤니티
          </div>
        </div>
      </div>

      {/* 하단 고정 네비게이션 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '390px',
          zIndex: 10,
        }}
      >
        <NavBar />
      </div>
    </div>
  )
}

export default Main
