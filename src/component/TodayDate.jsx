import React from 'react';

const TodayDate = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ padding: '10px', fontSize: '16px' }}>
      📅 오늘 날짜: {today}
    </div>
  );
};

export default TodayDate;
