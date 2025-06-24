import React from 'react'
import logo from '../assets/daonLogo.png'
import { useNavigate } from 'react-router-dom'
import '../style/header.css'
const Header = () => {
    const nav = useNavigate()
    return (
        <header>
            <div className="logo" onClick={()=>{nav('/')}}>
                <img src={logo} className="logo-img" alt="logo" />
                <br />
                <span className="logo-text">귀어로드</span>
            </div>
            <div className="menu">
                 <span onClick={() => { nav('/login') }}>로그인</span> | <span onClick={() => { nav('join') }}>회원가입</span>
            </div>
        </header>
    )
}

export default Header