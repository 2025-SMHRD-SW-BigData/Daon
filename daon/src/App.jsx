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

import YouthSupport from './component/YouthSupport';
import Fish_licensedfishery from './component/Fish_licensedfishery';
import Fish_reported from './component/Fish_reported';
import FIsh_permitfishery from './component/FIsh_permitfishery';
import './App.css';
import Fish_fishingboat from './component/Fish_fishingboat';

function App() {
  return (
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

        <Route path='/reportfishery' element={<Fish_reported />} />
        <Route path='/licensedfishery' element={<Fish_licensedfishery />} />
        <Route path='/permitfishery' element={<FIsh_permitfishery />} />
        <Route path='/fishingboat' element={<Fish_fishingboat />} />
        

        <Route path="/youthsupport" element={<YouthSupport />} />

      </Routes>
  );
}

export default App;
