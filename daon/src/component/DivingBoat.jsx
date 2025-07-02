// DivingBoat.jsx - 잠수기어선 소개 페이지 (UI 개선)
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/divingboat.css';
import useFavorite from '../hooks/useFavorite';
import RecommendList from './RecommendList';

const DivingBoat = () => {
    const pageTitle = '잠수기어선';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="divingboat-container">
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
                    <h3 className="section-hash">잠수기어선</h3>

                    <img
                        src="/UIimages/잠수기어선.jpg"
                        alt="잠수기어선"
                        className="divingboat-img"
                    />

                    <div className="divingboat-info">
                        <p><span className="blue bold">▼ 방식</span><br />
                            잠수부가 직접 잠수하여 갈퀴 등으로 패류 및 해조류 채취
                        </p>

                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />
                            바지락 및 기타 패 등의 어패류 위주
                        </p>

                        <p><span className="blue bold">▼ 작업 해역</span><br />
                            개펄이 풍부한 연안의 수심 10m ~ 40m 구역
                        </p>

                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
                            소형 (10톤 미만) / 디젤 또는 전기 추진의 프로펠러 방식
                        </p>

                        <p><span className="blue bold">▼ 특징</span><br />
                            소형 동력선에 소속 인원이 잠수복 및 산소연으로 어패류 채취
                        </p>

                        <div className="divingboat-note">
                            <p><span className="bold">공기 공급기 :</span> 공기호스로 잠수부에 공기 전달</p>
                            <p><span className="bold">잠수장비 일체 :</span> 잠수복, 잠수용 투구, 마스크, 납</p>
                            <p><span className="bold">다이버 텔레폰 :</span> 잠수부와 유무선 통신. 비상 시 신호줄로 대체</p>
                            <p><span className="bold">엄블리컬 케이블 :</span> 공기호스, 통신선, 전원선 등을 일체화</p>
                        </div>

                        {/* ✅ 추천 어항 리스트 삽입 */}
                        <RecommendList vesselType="잠수기" />
                    </div>

                    <a
                        className="divingboat-btn"
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

export default DivingBoat;
