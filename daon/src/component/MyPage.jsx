// ✅ Header는 scroll-area 바깥에 위치시켜 고정하고, 나머지를 스크롤 처리
import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import '../style/mypage.css';
import '../style/main.css';
import Mypageimage from './Mypageimage';
import NavBar from './NavBar';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.user_id) {
            return;
        }
        axios
            .get('http://localhost:3003/mypage/data', {
                params: { user_id: user.user_id },
            })
            .then((res) => {
                setFavorites(res.data.favorites);
                setUserInfo(res.data.userData[0]);
            })
            .catch((error) => {
                console.log('마이페이지 정보 조회 중 오류 발생', error);
            });
    }, [user]);

    return (
        <div className="phon_size">
            {/* ✅ 헤더는 스크롤 영역 밖에 고정 */}
            <Header />

            {/* ✅ 스크롤 처리 영역 */}
            <div className="scroll-area">
                <div className="mypage">마이페이지</div>
                <div className="hr_style"><hr /></div>

                <Mypageimage nickname={userInfo?.nickname} />

                <div className="hr_style"><hr /></div>

                <p className="mypage">즐겨찾기</p>
                <br />
                <br />
                <div
                    style={{
                        width: '300px',
                        margin: 'auto',
                        borderRadius: '10px',
                        border: '1px solid #66A5ED',
                        padding: '10px',
                    }}
                >
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
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                {item.name}
                            </div>
                        ))
                    )}
                </div>

                <div className="hr_style"><hr /></div>
                
            </div>

            <NavBar />
        </div>
    );
};

export default MyPage;