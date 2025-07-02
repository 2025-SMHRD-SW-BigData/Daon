import React, { useState, useContext, useEffect } from 'react'
import Header from './Header'
import '../style/mypage.css'
import '../style/main.css'
import Mypageimage from './Mypageimage'
import NavBar from './NavBar'
import TodayDate from './TodayDate'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyPage = () => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState();

    useEffect(() => {
        if (!user?.user_id) {
            alert('로그인 후 마이페이지에 접속해주세요')
            navigate('/')
            return;
        }
        axios
            .get('http://localhost:3003/mypage/data', {
                params: { user_id: user.user_id }
            })
            .then((res) => {
                setFavorites(res.data.favorites)
                setUserInfo(res.data.userData[0])
                // console.log(userInfo.nickname)
                // console.log(res.data.favorites[0])
            })
            .catch((error) => {
                console.log('마이페이지 정보 조회 중 오류 발생', error)
            })
    }, [user])


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

                <Mypageimage nickname={userInfo.nickname}></Mypageimage>


                <div className='hr_style'><hr /></div>

                <p className='mypage'>즐겨찾기</p>
                <br />
                <br />
                <div style={{
                    width: '300px',
                    margin: 'auto',
                    borderRadius: '10px',
                    borderColor: '#66A5ED',
                    border: '1px solid #000',
                    padding: '10px'
                }}>
                    {favorites.length === 0 ? (
                        <p>즐겨찾기가 없습니다.</p>
                    ) : (
                        favorites.map((item) => (
                            <div
                                key={item.favorite_id}
                                style={{
                                    marginBottom: '8px',
                                    padding: '6px',
                                    backgroundColor: '#f5faff',
                                    border: '1px solid #66A5ED',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                {item.name}
                            </div>
                        ))
                    )}
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
                    borderColor: '#66A5ED'
                }}></div>
                오늘 날짜: {new Date().toLocaleDateString('ko-KR')}
                <NavBar></NavBar>
            </div>
        </div>
    )
}

export default MyPage