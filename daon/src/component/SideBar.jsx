// ✅ 개선된 SideBar.jsx
import React, { useState, useContext } from 'react';
import '../style/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


// 메뉴와 연동 경로 매핑
const routeMap = {
  '귀어인의 집': '/homehouse',
  '귀어학교지원': '/fischool',
  '청년어선임대사업': '/youthboat',
  '귀어창업지원': '/startupsupport',
  '청년어촌정착지원': '/youthsupport',
  '주택구입자금지원': '/housingloan',
  '지역 게시판': '/community',
  '전문 정착상담사': '/consult',
  'AI챗봇': '/chatbot',
  '자망어선': '/gillnet',
  '연승어선': '/longline',
  '저인망어선': '/trawl',
  '권현망어선': '/pairtrawl',
  '통발어선': '/trapboat',
  '잠수기어선': '/divingboat',
  '선망어선': '/purseine',
  '어장 위치': '/location',
  '해양 환경': '/marineenv',
  '지역 특성': '/regionfeature',
  '면허어업': '/licensedfishery',
  '허가어업': '/permitfishery',
  '신고어업': '/reportfishery',
  '낚시어선업': '/fishingboat',
  '자격증': '/certificate',
};

const menuData = [
  {
    category: '어촌 정보 탐색',
    subItems: ['어장 위치', '해양 환경', '지역 특성'],
  },
  {
    category: '어선 정보',
    subItems: ['자망어선', '연승어선', '저인망어선', '권현망어선', '통발어선', '잠수기어선', '선망어선'],
  },
  {
    category: '지원금 및 정책',
    subItems: ['귀어인의 집', '귀어학교지원', '청년어선임대사업', '귀어창업지원', '청년어촌정착지원', '주택구입자금지원'],
  },
  {
    category: '어업 자격',
    subItems: ['면허어업', '허가어업', '신고어업', '낚시어선업', '자격증'],
  },
  {
    category: '커뮤니티',
    subItems: ['지역 게시판', '전문 정착상담사', 'AI챗봇'],
  },
];

const SideBar = ({ isOpen, toggleSidebar }) => {
  const nav = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user, setUser } = useContext(UserContext); // ✅ 로그인 정보 가져오기

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleItemClick = (item) => {
    const route = routeMap[item];
    if (route) {
      nav(route);
    } else {
      alert(`${item} 경로가 아직 연결되지 않았습니다.`);
    }
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setUser(null); // ✅ 사용자 정보 초기화
      nav('/');       // 홈으로 이동
    }
  };

  return (
    <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={toggleSidebar}>×</button>

        {/* ✅ 로그인 상태 */}
        {user ? (
          <>
            <p id='p1'>반갑습니다.</p>
            <p id='p2'>
              <strong id='name'>{user.username}님</strong> 마이페이지{' '}
              <span id="ckMypg" onClick={() => nav('/mypage')}>바로가기 {'>'}</span>
            </p>
            <button className="my-page-btn" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          // ✅ 비로그인 상태
          <>
            <p id='p1'>반갑습니다.</p>
            <p id='p2'>
              <strong id='name'>귀어로드</strong>{' '}
              <span id="ckMypg">회원가입 하러가기{'>'}</span>
            </p>
            <button className="my-page-btn" onClick={() => nav('/login')}>로그인</button>
          </>
        )}


      </div>

      <div className="sidebar-body">
        <div className="menu-left">
          <ul>
            {menuData.map((menu) => (
              <li
                key={menu.category}
                className={selectedCategory === menu.category ? 'active' : ''}
                onClick={() => handleCategoryClick(menu.category)}
              >
                {menu.category}
                <span className={selectedCategory === menu.category ? 'arrow' : 'arrow-no'}>▶</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedCategory && (
          <div className="menu-right">
            <ul>
              {menuData.find((m) => m.category === selectedCategory)?.subItems.map((item, idx) => (
                <li key={idx} onClick={() => handleItemClick(item)}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SideBar;
