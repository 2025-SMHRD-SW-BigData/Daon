import React from 'react';
import '../styles/community.css';
import comuImg from '../assets/comu.png';

const CommunitySection = () => (
  <div className="community-section">
    <img src={comuImg} alt="커뮤니티" className="community-img" />
    <div className="overlay-text">커뮤니티</div>
  </div>
);

export default CommunitySection;