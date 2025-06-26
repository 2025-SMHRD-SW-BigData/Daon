import React from 'react';
import '../styles/infocards.css';

const InfoCards = ({ items }) => (
  <div className="info-cards">
    {items.map((text, idx) => (
      <div key={idx} className="info-card">
        {text}
      </div>
    ))}
  </div>
);

export default InfoCards;