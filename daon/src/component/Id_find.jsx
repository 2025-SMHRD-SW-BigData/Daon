import React, { useState } from 'react'
import Header from './Header'
import NavBar from './NavBar'
import '../style/idfind.css'
import axios from 'axios'


const Id_find = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [resId, setResId] = useState('');
    const [errM, setErrM] = useState('');

    const handleFindId = () => {

        if(!name || !phone){
            setErrM('이름과 휴대폰 번호를 모두 입력하세요.');
            setResId('');
            return;
        }

        axios.post('/user/find-id', { name, phone })
    .then((res)=>{
        if (res.data.id){
           setResId(res.data.id);
           setErrM('');
            // alert('아이디는:'+ res.data.id)

        }else{
            setResId('');
            setErrM('일치하는 회원 정보가 없습니다')
            // alert('일치하는 회원 정보가 없습니다.');
        }
    })
    .catch((err)=>{
        console.error(err);
        setResId('');
        setErrM('서버 오류가 발생했습니')
    })
    }
    



    return (
        <div style={{
            width: '390px',
            height: '844px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'

        }}>
            <Header></Header>

            <br /><br /><br />

            <div className="id-head">아이디 찾기</div>
            <br />
            <p className='id-body'>이름</p>
            <input className='inputname' type="text" placeholder='이름' value={name} onChange={(e)=>setName(e.target.value)}/>
            <p className='id-body'>휴대폰번호</p>
            <input className='inputname' type="text" placeholder='휴대폰번호' value={phone} onChange={(e)=>setPhone(e.target.value)}/>

            <button onClick={handleFindId} className='idbtn'>아이디 찾기</button>

{/* 결과 아이디 표시 */}
      {resId && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
          아이디: <strong>{resId}</strong>
        </p>
      )}

      {/* 에러 메시지 표시 */}
      {errM && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
          {errM}
        </p>
      )}

            <NavBar></NavBar>

        </div >

    )
}

export default Id_find