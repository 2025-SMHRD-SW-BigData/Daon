import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../style/chatbot.css';
import '../style/headerlayout.css';
import Header from './Header';
import NavBar from './NavBar';

const Chatbot = () => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]); // 대화 내용 배열
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!msg.trim()) return;

    // 1. 사용자 메시지 추가
    const userMessage = { sender: 'user', text: msg };
    setMessages(prev => [...prev, userMessage]);

    // 2. 서버에 메시지 전송
    axios
      .post('http://localhost:3003/chatbot/ask', { message: msg })
      .then((res) => {
        const botMessage = { sender: 'bot', text: res.data.reply };
        setMessages(prev => [...prev, botMessage]);
      })
      .catch((error) => {
        const errorMessage = { sender: 'bot', text: '⚠️ 에러가 발생했습니다.' };
        setMessages(prev => [...prev, errorMessage]);
      });

    setMsg('');
  };

  // 스크롤 자동 내리기
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="phon_size">

      <Header />

      <div className="scroll-area header-layout">

        <h2 className="chatbot-title">💬 다온 챗봇</h2>

        <div className="chat-area">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${m.sender === 'user' ? 'user' : 'bot'}`}
            >
              {m.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="무엇을 도와드릴까요?"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>전송</button>
        </div>

      </div>

      <NavBar />
    </div>
  );
};

export default Chatbot;
