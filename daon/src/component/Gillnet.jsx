// Gillnet.jsx - 자망어선 정보 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/gillnet.css';
import useFavorite from '../hooks/useFavorite';
import RecommendList from './RecommendList';

const Gillnet = () => {
    const pageTitle = '자망어선';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="gillnet-container">
                    <h2 style={{display:'flex',justifyContent:'space-between'}} className="page-title">
                        어선 정보
                        <button
                            onClick={toggleFavorite}
                      d      style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '22px',
                                color: '#f0c420',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}>{isFavorite ? '★' : '☆'}</button>
                    </h2>
                    <h3 className="section-hash">자망어선</h3>

                    <img
                        src="/UIimages/자망어선.jpg"
                        alt="자망어선"
                        className="gillnet-img"
                    />

                    <div className="gillnet-info">
                        <p><span className="blue bold">▼ 방식</span><br />
                            떠 있는 그물을 띄워 한 지점 고정 또는 조류에 따라 흘려 포획
                        </p>

                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />
                            꽃게, 가자미, 홍치 등. 계절과 해역에 따른 다목적 운용형
                        </p>

                        <p><span className="blue bold">▼ 작업 해역</span><br />
                            연안 ~ 근해 (30해리)
                        </p>

                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
                            소형 (30톤 이하) / 디젤 엔진 프로펠러 추진
                        </p>

                        <p><span className="blue bold">▼ 특징</span><br />
                            계절별, 해역별, 수심별 맞춤형 다목적 조업 선박
                        </p>

                        <p><span className="blue bold">▼ 필요 장비</span><br />
                            <b>유압식 드럼 또는 릴:</b> 그물을 빠르게 감고 풂<br />
                            <b>롤러:</b> 그물이 선체에 걸리지 않도록 유도 정리<br />
                            <b>윈치:</b> 부표 및 무게줄 설치 및 회수하는 크레인<br />
                            <b>부표, 밧줄, 그물 부속:</b> 그물의 설치와 유지
                        </p>

                        {/* ✅ 추천 어항 리스트 삽입 */}
                        <RecommendList vesselType="자망" />
                    </div>

                    <a
                        className="gillnet-btn"
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

export default Gillnet;