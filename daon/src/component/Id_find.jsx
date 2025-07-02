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

        if(!name||!phone){
            setErrM('이름과 휴대폰 번호를 모두 입력하세요.');
            return;
        }

        axios.post('http://localhost:3003/user/find-id',{name:name,phone:phone})
    .then((res)=>{
        if (res.data.id){
            alert('아이디는:'+ res.data.id)
        }else{
            alert('일치하는 회원 정보가 없습니다.');
        }
    })
    .catch((err)=>{
        console.error(err);
        alert('서버 오류');
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

            <NavBar></NavBar>

        </div >

    )
}

export default Id_find