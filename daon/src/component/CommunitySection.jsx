// ✅ CommunitySection.jsx - 커뮤니티 섹션 배너

import React from 'react';
import '../style/communitysection.css';
import comuImg from '../assets/comu.png';

const CommunitySection = () => {
  return (
    <div className="community-section">
      <img src={comuImg} alt="커뮤니티" className="community-img" />
      <div className="community-label">커뮤니티</div>
    </div>
  );
};

export default CommunitySection;
