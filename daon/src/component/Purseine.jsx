// Purseine.jsx - 선망어선 소개 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/purseine.css';
import useFavorite from '../hooks/useFavorite';
import RecommendList from './RecommendList';

const Purseine = () => {
    const pageTitle = '면허어업';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="purseine-container">
                    <h2 style={{display:'flex',justifyContent:'space-between'}} className="page-title">
                        어선 정보
                        <button
                            onClick={toggleFavorite}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '22px',
                                color: '#f0c420',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}>{isFavorite ? '★' : '☆'}</button>
                    </h2>
                    <h3 className="section-hash">선망어선</h3>

                    <img
                        src="/UIimages/선망어선.jpg"
                        alt="선망어선"
                        className="purseine-img"
                    />

                    <div className="purseine-info">
                        <p><span className="blue bold">▼ 방식</span><br />
                            선단 단위 규모 운용, 물고기 떼를 그물로 둘러싸서 포획
                        </p>

                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />
                            고등어 및 정어리, 다랑어 등 "무리"를 짓는 어종
                        </p>

                        <p><span className="blue bold">▼ 작업 해역</span><br />
                            고등어 계열은 서해~남부, 다랑어 등은 태평양 원양 조업
                        </p>

                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
                            소형부터, 원양용은 1,300톤급까지 / 디젤기관 프로펠러
                        </p>

                        <p><span className="blue bold">▼ 특징</span><br />
                            본선 직접, 통신과 운반선을 포함한 선단 단위의 협동형 조업
                        </p>

                        <div className="purseine-note">
                            <p><span className="bold">파워블록 :</span> 그물회수 자동화 핵심설비. 대규모 그물에 효과적</p>
                            <p><span className="bold">대형 선망 인회기 :</span> 유압으로 대구경 그물을 안정적으로 회수</p>
                            <p><span className="bold">편망 릴 :</span> 유압으로 파워블록, 그물 설치에 고정</p>
                            <p><span className="bold">전자장비 :</span> 어군탐지기, 소나, 레이더, GPS 장비 일체</p>
                        </div>

                        {/* ✅ 추천 어항 리스트 삽입 */}
                        <RecommendList vesselType="선망" />
                    </div>

                    <a
                        className="purseine-btn"
                        href="http://www.ksupk.or.kr/file/index.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        구매 관련 사이트 이동하기
                    </a>
                </div>
            </div>

            <NavBar />
        </div>
    );
};

export default Purseine;