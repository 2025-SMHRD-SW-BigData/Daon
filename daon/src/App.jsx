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


import HomeHouse from './component/HomeHouse';
import FiSchool from './component/FiSchool';
import YouthBoat from './component/youthboat';
import StartUpSupport from './component/StartUpSupport';
import HousingLoan from './component/HousingLoan';

import YouthSupport from './component/YouthSupport';
import Fish_licensedfishery from './component/Fish_licensedfishery';
import Fish_reported from './component/Fish_reported';
import FIsh_permitfishery from './component/FIsh_permitfishery';
import Fish_fishingboat from './component/Fish_fishingboat';

import Gillnet from './component/Gillnet';
import Longline from './component/Longline';
import Trawl from './component/Trawl';
import Pairtrawl from './component/PairTrawl';
import Trapboat from './component/Trapboat';
import DivingBoat from './component/DivingBoat';
import Purseine from './component/Purseine';

import './App.css';

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

      {/* 어업 관련 페이지 */}
      <Route path='/reportfishery' element={<Fish_reported />} />
      <Route path='/licensedfishery' element={<Fish_licensedfishery />} />
      <Route path='/permitfishery' element={<FIsh_permitfishery />} />
      <Route path='/fishingboat' element={<Fish_fishingboat />} />

      {/* 정책지원 관련 페이지 */}
      <Route path="/homehouse" element={<HomeHouse />} />
      <Route path="/fischool" element={<FiSchool />} />
      <Route path="/youthboat" element={<YouthBoat />} />
      <Route path="/youthsupport" element={<YouthSupport />} />
      <Route path="/startupsupport" element={<StartUpSupport />} />
      <Route path="/housingloan" element={<HousingLoan />} />

      {/* 어선정보 관련 페이지 */}
      <Route path="/gillnet" element={<Gillnet />} />
      <Route path="/longline" element={<Longline />} />
      <Route path="/trawl" element={<Trawl />} />
      <Route path="/pairtrawl" element={<Pairtrawl />} />
      <Route path="/trapboat" element={<Trapboat />} />
      <Route path="/divingBoat" element={<DivingBoat />} />
      <Route path="/purseine" element={<Purseine />} />

    </Routes>
  );
}

export default App;