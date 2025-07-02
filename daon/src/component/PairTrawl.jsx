// PairTrawl.jsx - 권현망어선 소개 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/pairtrawl.css';
import useFavorite from '../hooks/useFavorite';
import RecommendList from './RecommendList'; // 추가

const PairTrawl = () => {


    const pageTitle = '권현망어선';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);


    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="pairtrawl-container">
                    <h2 style={{ display: 'flex', justifyContent: 'space-between' }} className="page-title">
                        어선 정보
                        <button
                            onClick={toggleFavorite}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '22px',
                                color: '#f0c420',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                        >
                            {isFavorite ? '★' : '☆'}
                        </button>
                    </h2>
                    <h3 className="section-hash">권현망어선</h3>

                    <img
                        src="/UIimages/권현망어선.jpg"
                        alt="권현망어선"
                        className="pairtrawl-img"
                    />

                    <div className="pairtrawl-info">
                        <p><span className="blue bold">▼ 방식</span><br />
                            선단을 구축 및 협력하여 긴 그물을 펼쳐 어군을 포위하여 포획
                        </p>

                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />
                            멸치를 집중포획, 단, 그물망이므로 기타 어종 혼획
                        </p>

                        <p><span className="blue bold">▼ 작업 해역</span><br />
                            남해안 근해
                        </p>

                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
                            본선 30톤 이하 및 규정상 등록 제한 / 단, 다양한 부속선 동원
                        </p>

                        <p><span className="blue bold">▼ 특징</span><br />
                            선단 구성으로 앞/옆에서 그물로 끌어 포획
                        </p>

                        <div className="pairtrawl-note">
                            <p><span className="bold">피쉬펌프 :</span> 그물에서 자동화 흡입선별. 대형 그물에 효과적</p>
                            <p><span className="bold">대형 선망 윈치 :</span> 유압식으로 대규모 그물을 안정적으로 회수</p>
                            <p><span className="bold">클러치 :</span> 그물이 선미 등에 걸리지 않게 돕는 유압 클러치</p>
                            <p><span className="bold">전자장비 :</span> 어군감지기, 소나 등</p>
                        </div>

                        {/* ✅ 추천 어항 리스트 삽입 */}
                        <RecommendList vesselType="권현망" />
                    </div>

                    <a
                        className="pairtrawl-btn"
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

export default PairTrawl;
