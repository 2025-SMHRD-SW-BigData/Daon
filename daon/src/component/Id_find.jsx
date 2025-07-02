import React, {useState} from 'react'
import Header from './Header'
import NavBar from './NavBar'
import '../style/idfind.css'
import axios from 'axios'


const Id_find = () => {
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
            <input className='inputname' type="text" placeholder='이름' />
            <p className='id-body'>휴대폰번호</p>
            <input className='inputname' type="text" placeholder='휴대폰번호' />

            <button className='idbtn'>아이디 찾기</button>

<NavBar></NavBar>

        </div >

    )
}

export default Id_find