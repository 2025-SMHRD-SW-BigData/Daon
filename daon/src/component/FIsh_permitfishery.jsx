import React from 'react'
import Header from './Header'
import '../style/fish자격.css'
import '../style/main.css'
import NavBar from './NavBar'


const FIsh_permitfishery = () => {
  return (

    <div className='phon_size'>
        <div  style={{
       flex: 1,
                overflowY: 'scroll',
                paddingBottom: '100px', // NavBar 가려지지 않도록 여유 공간 확보
                boxSizing: 'border-box'
    }}>

        
          <Header></Header>
          
       <div className='fish_qualification'>어업 자격</div>
        <div className='hr_style'><hr /></div>
        <h2 className='fish_head'># 허가어업</h2>
        <p style={{
          fontSize: '15px',
          paddingTop: '10px'
        }}>수산자원을 보호하고 조절하기 위해,일정한 어업을<br/>
        하기전에 국가 또는 지자체의 허가를 받아야 하는 어업
        </p>
        <br />
        <p className='fish_body_font'> <span style={{fontSize:'10px',marginRight: '6px'}}> ▼ </span>  신청자격</p>
        <p style={{
          padding : '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>누구나 신청 가능</p>
        <p className='fish_body_font'> <span style={{fontSize:'10px',marginRight: '6px'}}> ▼ </span> 신청방법</p>
        <p style={{
          padding : '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>인터넷, 방문, 우편</p>
        <p className='fish_body_font'> <span style={{fontSize:'10px',marginRight: '6px'}}> ▼ </span> 처리기간</p>
        <p style={{
          padding : '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>유형에 따라 다름(하단참조)</p>
        <p className='fish_body_font'> <span style={{fontSize:'10px',marginRight: '6px'}}> ▼ </span> 제출 서류</p>
        <p style={{
          padding : '10px 0px 20px 50px',
          textAlign: 'left',
          fontSize: '15px',
        }}>
            <p style={{fontSize:'16px',
                fontWeight : 'bold'
            }}>
            근해어업,연안어업
            </p>
            <p>
            선박등기부등본 1부 | 어선검사증명서 1부 | 교육 이수 서류 1부
            </p>
           <br  />
            <p>
                구획어업
            </p>
            </p>
        
        <p className='fish_body_font'> <span style={{fontSize:'10px',marginRight: '6px'}}> ▼ </span> 신청방법 및 절차</p>
            
            <div style={{
          border: '1px solid #6CB8FF',
          borderRadius: '8px',
          padding: '12px',
          margin: '20px 30px 30px 30px',
          width : '300px'
        }}>
          
          <p> <span style={{fontSize : '20px'}}>①</span> 접수 - <span style={{ 
            color : '#6CB8FF',
            fontSize : '13px'
          }}>
               시 . 군 . 구 </span></p>
          <br />
          <p> <span style={{fontSize : '20px'}}>②</span> 협의 - <span style={{
            color : '#6CB8FF',
            fontSize : '13px'
          }}>군부대,문화재관리국<br/>
          지방국토관리청,지방해양수산청</span></p>
          <br />
          <p> <span style={{fontSize : '20px'}}>②</span> 처리 - <span style={{
              color : '#6CB8FF',
              fontSize : '13px'
            }}>시 . 군 . 구</span></p>
            </div>
         

<button className='pdf-btn'
  onClick={() => {
    const link = document.createElement('a');
    link.href = '/pdf/면허어업.pdf';
    link.download = '면허어업.pdf';
    link.click(); 
  }}
>
  어업 면허 신청서 다운
</button>
  


          
        </div>
          <NavBar></NavBar>

    </div>
  )
}



export default FIsh_permitfishery