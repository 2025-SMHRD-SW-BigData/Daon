import React, { useState } from 'react';
import axios from 'axios';
import '../style/chatbot.css'


const Chatbot = () => {
    const [msg, setMsg] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = () => {
        axios
            .post('http://localhost:3003/ask', { message: msg })
            .then((res) => {
                // 서버로부터 받은 응답 데이터를 JSON 문자열로 변환하여 상태 변수에 저장합니다.
                // 보기 좋게 들여쓰기(2칸)하여 출력합니다.
                //   setResponse(JSON.stringify(res.data, null, 2));
                // 데이터 확인해보고
                console.log(res.data.reply)
                // Response에 저장 딱 해주고
                setResponse(res.data.reply)
            })
            .catch((error) => {
                console.log('Error:', error);
                setResponse('에러: ' + error.message);
            });
    };

    return (
        <div className="chatbot-container">
            <h2 className="chatbot-title">💬 다온 챗봇</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="무엇을 도와드릴까요?"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Enter로 전송
                />
                <button onClick={sendMessage}>전송</button>
            </div>
            <div className="chatbot-response">{response}</div>
        </div>
    );
};

export default Chatbot;
