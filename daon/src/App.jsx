import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import axios from 'axios'
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
import Id_find from './component/Id_find';
import Pw_find from './component/Pw_find';

import PolicyCategory from './component/PolicyCategory';


import LicenseInfo from './component/LicenseInfo';
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

import VesselCategory from './component/VesselCategory';
import TransitionSplash from './component/TransitionSplash'; // ✅ 출항 로딩페이지

import CompareVillage from './component/CompareVillage'; // 정착 비교 페이지

import QuestionList from './component/QuestionList';
import QuestionForm from './component/QuestionForm';
import QuestionDetail from './component/QuestionDetail';


import './App.css';

function App() {
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;

  // ✅ 자동 로그인 체크
  useEffect(() => {
    axios
      .get('http://localhost:3003/user/check-auth', {
        withCredentials: true  //이걸 꼭 추가해야 쿠키가 서버로 전송된다니
      })
      .then(res => {
        if (res.data.success) {
          setUser({
            user_id: res.data.user.user_id,
            username: res.data.user.username,
            nickname: res.data.user.nickname,
            role: res.data.user.role
          });
        }
      })
      .catch(err => {
        console.log('로그인 유지 실패 또는 비로그인 상태');
      });
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {/* ✅ 출항 애니메이션용 페이지 */}
        <Route path='/splash' element={<TransitionSplash />} />

        {/* 기본 메인 페이지 */}
        <Route path='/' element={<Main />} />
        <Route path='/map' element={<Map2 />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/community' element={<CommunityPage />} />
        <Route path='/community/:id' element={<PostDetail />} />
        <Route path='/community/write' element={<CommunityWrite />} />
        <Route path='/idfind' element={<Id_find />} />
        <Route path='/pwfind' element={<Pw_find />} />

        {/* 어업 관련 페이지 */}
        <Route path="/licenseinfo" element={<LicenseInfo />} />

        <Route path='/reportfishery' element={<Fish_reported />} />
        <Route path='/licensedfishery' element={<Fish_licensedfishery />} />
        <Route path='/permitfishery' element={<FIsh_permitfishery />} />
        <Route path='/fishingboat' element={<Fish_fishingboat />} />

        {/* 정책지원 관련 페이지 */}
        <Route path="/policyinfo" element={<PolicyCategory />} />

        <Route path="/homehouse" element={<HomeHouse />} />
        <Route path="/fischool" element={<FiSchool />} />
        <Route path="/youthboat" element={<YouthBoat />} />
        <Route path="/youthsupport" element={<YouthSupport />} />
        <Route path="/startupsupport" element={<StartUpSupport />} />
        <Route path="/housingloan" element={<HousingLoan />} />

        {/* 어선정보 관련 페이지 */}
        <Route path="/vesselcategory" element={<VesselCategory />} />

        <Route path="/gillnet" element={<Gillnet />} />
        <Route path="/longline" element={<Longline />} />
        <Route path="/trawl" element={<Trawl />} />
        <Route path="/pairtrawl" element={<Pairtrawl />} />
        <Route path="/trapboat" element={<Trapboat />} />
        <Route path="/divingBoat" element={<DivingBoat />} />
        <Route path="/purseine" element={<Purseine />} />
        {/*여기까지 진행중*/}

        {/* 정착지 비교 관련 페이지 */}
        <Route path="/compare" element={<CompareVillage />} />

        {/* 전문정착상담가 Q&A */}
        <Route path='/questions' element={<QuestionList user={user} />} />
        <Route path='/question/new' element={<QuestionForm user={user} />} />
        <Route path='/question/:id' element={<QuestionDetail user={user} />} />

      </Routes>
    </UserContext.Provider>
  );
}

export default App;
