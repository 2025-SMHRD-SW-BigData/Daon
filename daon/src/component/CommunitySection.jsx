import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/communitysection.css';
import comuImg from '../assets/comu.png';

const CommunitySection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/community');
  };

  return (
    <div className="community-section" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={comuImg} alt="커뮤니티" className="community-img" />
      <div className="community-label">커뮤니티</div>
    </div>
  );
};

export default CommunitySection;
