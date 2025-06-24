import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/main.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './component/Header.jsx'
import NavBar from './component/NavBar.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Header></Header>
    <App />
    <NavBar></NavBar>
  </BrowserRouter>
  // </StrictMode>,
)
