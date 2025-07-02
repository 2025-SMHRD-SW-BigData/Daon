import React from 'react'
import Header from './Header'
import '../style/fish자격.css'
import '../style/main.css'
import NavBar from './NavBar'
import useFavorite from '../hooks/useFavorite';


const FIsh_permitfishery = () => {
  const pageTitle = '허가어업';
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
        <h2 className='fish_head'># 허가어업</h2>
        <p style={{
          fontSize: '15px',
          paddingTop: '10px'
        }}>수산자원을 보호하고 조절하기 위해,일정한 어업을<br />
          하기전에 국가 또는 지자체의 허가를 받아야 하는 어업
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
        }}>유형에 따라 다름(하단참조)</p>
        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 제출 서류</p>
        <p style={{
          padding: '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 'bold',
            paddingBottom: '10px'
          }}>
            근해어업,연안어업
          </p>
          <p>
            선박등기부등본 1부 <br />
            어선검사증명서 1부 <br />
            교육 이수 서류 1부
          </p>
          <br />
          <p style={{
            fontSize: '16px',
            fontWeight: 'bold',
            paddingBottom: '10px'
          }}>
            구획어업
          </p>
          <p>허가를 받으려는 수면의 위치 및 구역도 1부 <br />
            어업 허가를 받은 자의 동의서 1부 <br />
            선박등기부등본 1부 | 교육 이수 서류  1부 <br />
            어선검사증서 1부</p>
        </p>

        <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 신청방법 및 절차</p>

        <div style={{
          border: '1px solid #6CB8FF',
          borderRadius: '8px',
          padding: '12px',
          margin: '20px 30px 30px 30px',
          width: '300px'
        }}>
          <p style={{ textAlign: 'left', fontSize: '12px', marginBottom: '10px' }}>연안어업,구획어업 총 3일 <span style={{ marginLeft: '30px' }}>근해어업 총 5일</span></p>
          <p> <span style={{ fontSize: '15px' }}>①</span> 접수 - <span style={{
            color: '#6CB8FF',
            fontSize: '11px'
          }}>
            시 . 군 . 구 </span>
            <span style={{ textAlign: 'left', fontSize: '15px', marginLeft: '30px' }}>①</span> 접수 - <span style={{
              color: '#6CB8FF',
              fontSize: '11px'
            }}>
              시 . 군 . 구 </span></p>
          <br />
          <p> <span style={{ fontSize: '15px' }}>②</span> 처리 - <span style={{
            color: '#6CB8FF',
            fontSize: '11px'
          }}>시 . 군 . 구</span>
            <span style={{ marginLeft: '30px', fontSize: '15px' }}>②</span> 처리 - <span style={{
              color: '#6CB8FF',
              fontSize: '11px'
            }}>시 . 군 . 구
            </span>
          </p>

        </div>


        <button className='pdf-btn'
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/pdf/허가어업.pdf';
            link.download = '허가어업.pdf';
            link.click();
          }}
        >
          어업 허가 신청서 다운
        </button>




      </div>
      <NavBar></NavBar>

    </div>
  )
}



export default FIsh_permitfishery