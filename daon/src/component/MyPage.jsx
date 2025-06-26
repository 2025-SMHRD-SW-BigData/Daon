import Reac, { useState } from 'react'
import Header from './Header'
import '../style/mypage.css'
import '../style/main.css'
import Mypageimage from './Mypageimage'
import NavBar from './NavBar'
import TodayDate from './TodayDate'

const MyPage = () => {




    return (
        <div className='phon_size'>

            <div style={{
                flex: 1,
                overflowY: 'scroll',
                paddingBottom: '100px', // NavBar 가려지지 않도록 여유 공간 확보
                boxSizing: 'border-box'
            }}>
                <Header></Header>
                <div className='mypage'>마이페이지</div>
                <div className='hr_style'><hr /></div>

                <Mypageimage></Mypageimage>


                <div className='hr_style'><hr /></div>

                <p className='mypage'>즐겨찾기</p>
                <br />
                <br />
                <div style={{
                    width: '300px',
                    height: '100px',
                    border: '1px solid #000',
                    margin: 'auto',
                    borderRadius: '10px',
                    borderColor :'#66A5ED'
                }}>  
               
                </div>
                 오늘 날짜: {new Date().toLocaleDateString('ko-KR')}
                <div className='hr_style'><hr /></div>
                <p className='mypage'>정책알림</p>
                 <br />
                <br />
                <div style={{
                    width: '300px',
                    height: '100px',
                    border: '1px solid #000',
                    margin: 'auto',
                    borderRadius: '10px',
                    borderColor :'#66A5ED'
                }}></div>
                오늘 날짜: {new Date().toLocaleDateString('ko-KR')}
                <NavBar></NavBar>
            </div>
        </div>
    )
}

export default MyPage