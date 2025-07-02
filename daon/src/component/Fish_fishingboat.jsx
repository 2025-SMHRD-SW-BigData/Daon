import React from 'react'
import Header from './Header'
import '../style/fish자격.css'
import '../style/main.css'
import NavBar from './NavBar'
import useFavorite from '../hooks/useFavorite';


const Fish_fishingboat = () => {
    const pageTitle = '낚시어선업';
    const { isFavorite, toggleFavorite } = useFavorite(pageTitle);

    return (


        <div className='phon_size'>
            <div style={{
                flex: 1,
                overflowY: 'scroll',
                paddingBottom: '100px', // NavBar 가려지지 않도록 여유 공간 확보
                boxSizing: 'border-box'
            }}>


                <Header></Header>

                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='fish_qualification'>
                    어업 자격
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
                </div>
                <div className='hr_style'><hr /></div>
                <h2 className='fish_head'># 낚시어선업</h2>
                <p style={{
                    fontSize: '14px',
                    paddingTop: '10px'
                }}>낚시어선업이란 낚시 체험을 원하는 일반인을 태우고,<br />
                    요금을 받고 바다에서 낚시 활동을 할 수 있도록 운영하는 업 <br />
                    관련 법에 따라 등록해야만 합법적으로 운영
                </p>
                <br />
                <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span>  신청자격</p>
                <p style={{
                    padding: '10px 0px 20px 50px',
                    textAlign: 'left',
                    fontSize: '15px',
                }}>누구나 신청 가능</p>
                <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 신청방법</p>
                <p style={{
                    padding: '10px 0px 20px 50px',
                    textAlign: 'left',
                    fontSize: '15px',
                }}>방문</p>
                <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 처리기간</p>
                <p style={{
                    padding: '10px 0px 20px 50px',
                    textAlign: 'left',
                    fontSize: '15px',
                }}>총 2일</p>
                <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 제출 서류</p>
                <p style={{
                    padding: '10px 0px 20px 50px',
                    textAlign: 'left',
                    fontSize: '15px',
                }}>낚시어선업신고서 | 어선검사증서사본 | 해기사면허증사본 <br />
                    전문교육 이수증 | 설비 명세서 | 안전성 검사증서</p>

                <p className='fish_body_font'> <span style={{ fontSize: '10px', marginRight: '6px' }}> ▼ </span> 신청방법 및 절차</p>

                <div style={{
                    border: '1px solid #6CB8FF',
                    borderRadius: '8px',
                    padding: '12px',
                    margin: '20px 30px 30px 30px',
                    width: '300px'
                }}>

                    <p> <span style={{ fontSize: '20px' }}>①</span> 접수 - <span style={{
                        color: '#6CB8FF',
                        fontSize: '13px'
                    }}>
                        시 . 군 . 구, 특별자치도, 특별자치시 </span></p>
                    <br />
                    <p> <span style={{ fontSize: '20px' }}>②</span> 처리 - <span style={{
                        color: '#6CB8FF',
                        fontSize: '13px'
                    }}>시 . 군 . 구, 특별자치도, 특별자치시</span></p>
                </div>
                <br />

                <button className='pdf-btn'
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/pdf/낚시어선업.pdf';
                        link.download = '낚시어선업.pdf';
                        link.click();
                    }}
                >
                    낚시어선업 신청서 다운
                </button>




            </div>
            <NavBar></NavBar>

        </div>
    )
}


export default Fish_fishingboat