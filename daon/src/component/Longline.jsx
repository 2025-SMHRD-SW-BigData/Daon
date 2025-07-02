// Longline.jsx - 연승어선 정보 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/longline.css';
import useFavorite from '../hooks/useFavorite';
import RecommendList from './RecommendList';

const Longline = () => {
    const pageTitle = '연승어선';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="longline-container">
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
                    <h3 className="section-hash">연승어선</h3>

                    <img
                        src="/UIimages/연승어선.jpg"
                        alt="연승어선"
                        className="longline-img"
                    />

                    <div className="longline-info">
                        <p><span className="blue bold">▼ 방식</span><br />닻으로 고정하는 고정연승 및 해류로 이동하는 유동연승</p>
                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />대구, 명태, 가자미, 붕장어 등 육식성 어종</p>
                        <p><span className="blue bold">▼ 작업 해역</span><br />연안 ~ 근해 (50해리 이내)</p>
                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />연안 소형(10톤), 근해 (20~30톤) / 디젤 엔진</p>
                        <p><span className="blue bold">▼ 특징</span><br />다수의 낚시바늘이 달린 주낙으로 동시에 다수 어류 포획</p>
                        <p><span className="blue bold">▼ 필요 장비</span><br />
                            <b>모릿줄 및 아릿줄:</b> 낚시 바늘이 달린 긴 줄<br />
                            <b>양승기:</b> 투입한 줄을  회수하는 장비. 전동유압식<br />
                            <b>양승보조롤러:</b> 줄을 부드럽게 회수하도록 도움<br />
                            <b>사이드드럼:</b> 어구의 정리와 보관
                        </p>

                        {/* ✅ 추천 어항 리스트 삽입 */}
                        <RecommendList vesselType="연승" />
                    </div>

                    <a
                        className="longline-btn"
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

export default Longline;