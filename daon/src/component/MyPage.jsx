import Reac, { useState } from 'react'
import Header from './Header'
import '../style/mypage.css'
import '../style/main.css'
import Mypageimage from './Mypageimage'
import NavBar from './NavBar'

const MyPage = () => {




    return (
        <div className='phon_size' style={{

        }}>
            <Header></Header>
            <div className='mypage'>마이페이지</div>
            <div className='hr_style'><hr /></div>
            <div>
                
            </div>

<Mypageimage></Mypageimage>


            <div className='hr_style'><hr /></div>

            <p className='mypage'>즐겨찾기</p>
            <NavBar></NavBar>
        </div>
    )
}

export default MyPage