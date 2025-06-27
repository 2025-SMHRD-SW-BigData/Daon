// src/context/CommunityContext.jsx
import React, { createContext, useState } from 'react';

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '귀어 창업 준비 중인데 궁금한 게 있어요!',
      content: '귀어 창업 지원 정책이나 실제 경험 공유해주실 수 있나요?',
      author: '김어부',
      date: '2025.06.26',
      region: '전체지역',
    },
    {
      id: 2,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 3,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 4,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 5,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 6,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 7,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 8,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
    {
      id: 9,
      title: '장비 구매 어디서 하세요?',
      content: '낚시 장비나 양식장 장비 추천 부탁드립니다.',
      author: '박어민',
      date: '2025.06.25',
      region: '전체지역',
    },
  ]);

  const addPost = (newPost) => {
    setPosts((prev) => [{ id: Date.now(), ...newPost }, ...prev]);
  };

  return (
    <CommunityContext.Provider value={{ posts, addPost }}>
      {children}
    </CommunityContext.Provider>
  );
};
