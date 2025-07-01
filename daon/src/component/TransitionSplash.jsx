// TransitionSplash.jsx    로딩페이지
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/transitionsplash.css';
import boatVideo from '../assets/boat-sail.mp4'; // mp4 파일 경로

const TransitionSplash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location.state?.to || '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(targetPath);
    }, 800); // 0.8초 후 이동

    return () => clearTimeout(timer);
  }, [navigate, targetPath]);

  return (
    <div className="splash-screen">
      <video
        className="splash-video"
        autoPlay
        muted
        playsInline
        width="250"
        height="auto"
      >
        <source src={boatVideo} type="video/mp4" />
        로딩 페이지
      </video>
    </div>
  );
};

export default TransitionSplash;
