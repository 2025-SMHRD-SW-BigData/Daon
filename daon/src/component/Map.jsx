import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import map from '../assets/map.png'
import { useNavigate } from 'react-router-dom'



const Map = () => {

  const nav = useNavigate();

  return (
    <div
      style={{
        width: '300px',
        height: '200px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        border: '1px solid black',

      }}
    >


      
      <div  onClick={() => (nav('/map'))}>
        <img src={map} style={{
          width: '300px', height: '200px'
        }} />
      </div>

    </div>




  );
};

export default Map;