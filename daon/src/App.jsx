import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// 페이지 컴포넌트
import Main from './component/Main';
import Map from './component/Map';
import Map2 from './component/Map2';
import Join from './component/Join';
import Login from './component/Login';
import Chatbot from './component/Chatbot';
import MyPage from './component/MyPage';
import CommunityPage from './component/CommunityPage';
import PostDetail from './component/PostDetail';
import CommunityWrite from './component/CommunityWrite';
import { CommunityProvider } from './context/CommunityContext';

import './App.css';

function App() {
  return (
    <CommunityProvider>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/map' element={<Map2 />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/community' element={<CommunityPage />} />
        <Route path='/community/:id' element={<PostDetail />} />
        <Route path='/community/write' element={<CommunityWrite />} />
      </Routes>
    </CommunityProvider>
  );
}

export default App;
