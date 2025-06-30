// TrapBoat.jsx - 통발어선 소개 페이지
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import '../style/trapboat.css';

const TrapBoat = () => {
    return (
        <div className="phon_size">
            <Header />

            <div className="scroll-area">
                <div className="trapboat-container">
                    <h2 className="page-title">어선 정보</h2>
                    <h3 className="section-hash">통발어선</h3>

                    <img
                        src="/UIimages/통발어선.jpg"
                        alt="통발어선"
                        className="trapboat-img"
                    />

                    <div className="trapboat-info">
                        <p><span className="blue bold">▼ 방식</span><br />
                            통발 설치 후 충분한 유인 시간을 두고 인양
                        </p>

                        <p><span className="blue bold">▼ 주요 어획 어종</span><br />
                            문어, 골뱅이, 꽃게, 우럭
                        </p>

                        <p><span className="blue bold">▼ 작업 해역</span><br />
                            연근해
                        </p>

                        <p><span className="blue bold">▼ 선박 크기 / 동력 방식</span><br />
                            소형(5톤 ~ 10톤 내외) / 디젤 프로펠러 추진
                        </p>

                        <p><span className="blue bold">▼ 특징</span><br />
                            통발 함정으로 대상어를 포획
                        </p>

                        <div className="trapboat-note">
                            <p><span className="bold">통발 :</span> 문어 및 꽃게 등 대상어종에 따라 준비</p>
                            <p><span className="bold">모리줄과 부표 :</span> 통발 여럿을 줄에 매달아 설치</p>
                            <p><span className="bold">양승기 :</span> 통발을 효율적으로 끌어올림</p>
                            <p><span className="bold">롤러 </span> 통발과 통발이 달린 줄을 부드럽게 회수</p>
                        </div>
                    </div>

                    <a
                        className="trapboat-btn"
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

export default TrapBoat;
