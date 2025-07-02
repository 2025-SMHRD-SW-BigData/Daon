// Trawl.jsx - 저인망어선 소개 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/trawl.css';
import useFavorite from '../hooks/useFavorite';


const Trawl = () => {
    const pageTitle = '저인망어선';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="trawl-container">
                    <h2  style={{display:'flex',justifyContent:'space-between'}} className="page-title">
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
                            }}>{isFavorite ? '★' : '☆'}
                        </button>
                    </h2>
                    <h3 className="section-hash">저인망어선</h3>

                    <img
                        src="/UIimages/저인망어선.jpg"
                        alt="저인망어선"
                        className="trawl-img"
                    />

                    <div className="trawl-info">
                        <p><span className="blue bold">▼ 방식</span><br />
                            투망 후 수시간 동안 그물을 끌어서 어군을 "대량" 포획
                        </p>

                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />
                            갈치, 참조기, 병어류 등
                        </p>

                        <p><span className="blue bold">▼ 작업 해역</span><br />
                            남해 및 서해 남부 해역
                        </p>

                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
                            30t ~ 100t 급 / 동력선(내연엔진)
                        </p>

                        <p><span className="blue bold">▼ 특징</span><br />
                            대량포획 대비 정부차원의 금어기 및 금지구역 정보에 주의
                        </p>

                        <p><span className="blue bold">▼ 필요 장비</span><br />
                            <b>트롤 홋치 및 와이어 드럼:</b> 그물 양망 및 조작<br />
                            <b>트롤 포스트:</b> 그물을 지지하고 견인하는데 사용<br />
                            <b>슬립웨이:</b> 그물 양망 ~ 투하 시 이동되는 경사로<br />
                            <b>윈치 드럼:</b> 그물을 조작하고 조절하는 데에 이용
                        </p>
                    </div>

                    <a
                        className="trawl-btn"
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

export default Trawl;
