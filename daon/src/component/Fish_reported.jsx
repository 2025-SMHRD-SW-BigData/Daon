import React from 'react'
import Header from './Header'
import '../style/fish자격.css'
import '../style/main.css'
import NavBar from './NavBar'
import useFavorite from '../hooks/useFavorite';


const Fish_reported = () => {
  const pageTitle = '신고어업';
  const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

  return (
    <div className='phon_size'>
      <div style={{
        flex: 1,
        overflowY: 'scroll',
        paddingBottom: '100px', // NavBar 가려지지 않도록 여유 공간 확보
        boxSizing: 'border-box'
      }}>


        <Header></Header>
        <div style={{display:'flex',justifyContent:'space-between'}}>
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
            }}>{isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div className='hr_style'><hr /></div>
        <h2 className='fish_head'># 신고어업</h2>
        <p style={{
          fontSize: '15px',
          padding: '10px 10px 0 40px'
        }}>소규모 어업 활동을 하려는 사람이 허가나 면허없이,<br />
          관할 행정기관에 '신고'만 하면 할 수 있는 어업 형태
        </p>
        <br />
        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>  신청자격</p>
        <p style={{
          padding: '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>누구나 신청 가능</p>
        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 신청방법</p>
        <p style={{
          padding: '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>인터넷, 방문, 우편</p>
        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 처리기간</p>
        <p style={{
          padding: '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>총 2일</p>
        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 제출 서류</p>
        <p style={{
          padding: '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>구비 서류 없음</p>

        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 신청방법 및 절차</p>

        <div style={{
          border: '1px solid #6CB8FF',
          borderRadius: '8px',
          padding: '12px',
          margin: '20px 30px 30px 30px',
          width: '300px'
        }}>

          <p> <span style={{ fontSize: '20px' }}>①</span> 접수 - <span style={{
            color: '#6CB8FF',
            fontSize: '13px'
          }}>
            시 . 군 . 구 </span></p>
          <br />
          <p> <span style={{ fontSize: '20px' }}>②</span> 처리 - <span style={{
            color: '#6CB8FF',
            fontSize: '13px'
          }}>시 . 군 . 구</span></p>
        </div>
        <br />

        <button className='pdf-btn'
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/pdf/어업신고서.pdf';
            link.download = '어업신고서.pdf';
            link.click();
          }}
        >
          어업 신고 신청서 다운
        </button>




      </div>
      <NavBar></NavBar>

    </div>
  )
}

export default Fish_reported