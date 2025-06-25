import React, { useEffect } from 'react'
import '../style/main.css'
import Map from './Map'
import map from '../assets/map.png'

const Main = () => {


  return (
    <div>
      <div className="search-box" >
        <input type="text" placeholder="검색창" />
      </div>
      <br />
      <div>
        <div style={{ position: 'relative', display: 'inline-block' }} >

          <img src={map} style={{ width: '750px', height: '400px', borderRadius: '5%' }}></img>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            fontSize: '22px',
            fontWeight: 'bold'
          }}>
            어촌 정보 탐색 지도
          </div>
        </div>

        <br />
        <br />
        <br />

        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // 2열
            gridTemplateRows: '1fr 1fr',    // 2행
            gap: '20px',                    // 요소 간 간격
            backgroundColor: 'rgb(102,165,237)',
            width: '750px',
            height: '750px',
            margin: '0 auto',
            borderRadius: '5%',
            padding: '20px',                // 바깥 여백
            boxSizing: 'border-box',

          }}>
            <div className='div1' >
              <p style={{ textAlign : 'center'
              }}>어업 창업 정보 열람</p>
            </div>
            <div className='div2'>
              자격증 교육 정보
            </div>
            <div className='div3'>
              어업 장비 정보
            </div>
            <div className='div4'>
              정착 지원 정보
            </div>

          </div>


        </div>


      </div>

      <div className="section-title">
        업데이트
        <div>넣을 내용들 map함수로</div>
      </div>
      <div className="section-title">
        어촌마을정보
        <hr />
        어촌계
        <hr />
      </div>

    </div >
  )
}

export default Main