import React, { useEffect } from 'react'
// import '../style/main.css'
import Map from './Map'

const Main = () => {

  return (
    <div>
      <div className="search-box">
        <input type="text" placeholder="검색창" />
      </div>

      <div className="section-title">
        업데이트
        <div>넣을 내용들 map함수로</div>
      </div>
      <Map />
    </div>
  )
}

export default Main