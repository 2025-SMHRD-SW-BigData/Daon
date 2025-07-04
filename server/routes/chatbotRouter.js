// 필요한 모듈 불러오기
const express = require('express');          // Express 웹 서버 프레임워크
const axios = require('axios');              // HTTP 요청을 위한 라이브러리 (API 호출에 사용)
const { v4: uuidv4 } = require('uuid');      // 고유한 UUID 생성기 (요청 ID로 사용)


// 라우터 객체 생성
const router = express.Router();

// .env 파일 등에서 CLOVA API 키를 환경변수로 불러옴
const API_KEY = process.env.CLOVA_API_KEY;

// /ask 경로로 POST 요청이 들어오면 실행될 라우터
router.post('/ask', async (req, res) => {
  // 사용자 메시지 추출
  const userMessage = req.body.message;

  // Clova API에 요청할 때 필요한 HTTP 헤더 설정
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,                // 인증용 Bearer 토큰
    'X-NCP-CLOVASTUDIO-REQUEST-ID': uuidv4(),            // 고유 요청 ID (로그 추적용)
    'Content-Type': 'application/json',                  // 요청 본문이 JSON 형식임을 명시
    'Accept': 'application/json',                       // 어플리케이션 json으로 바꿧다잉
  };

  // Clova Studio API에 보낼 요청 본문 (챗봇의 역할 정의 + 사용자 입력 포함)
  const body = {
    messages: [
      {
        role: 'system',                                  // system 역할: 챗봇 설정/규칙 정의
        content:                                          
          `답변은 절대로 100자를 넘어가지 않게 답변한다. 1. 챗봇 역할 및 목적\n 이름은 '다온'이라고 한다.\n\n본 챗봇은 [귀어로드]의 공식 지원 챗봇으로서, 사용자 문의에 신속하게 답변하며, [귀어로드] 관련 정보를 제공하는 역할을 합니다.\n\n사용자가 편리하게 문제를 해결하고, 필요한 정보를 쉽게 얻을 수 있도록 돕는 것이 최우선 목표입니다.\n\n2. 대화 스타일\n\n친절하고 공손하며, 이해하기 쉬운 문장으로 응답합니다.\n\n너무 딱딱하지 않게, 자연스럽고 친근한 톤을 유지합니다.\n\n전문 용어는 가능한 쉽게 풀어 설명하거나, 사용자가 이해하기 어려운 경우 간단히 추가 설명을 덧붙입니다.\n\n3. 주요 기능 및 처리 범위\n\n[귀어로드] 관련 기본 정보 제공 (예: 기능, 가격, 사용법 등)\n\n자주 묻는 질문(FAQ) 대응\n\n간단한 문제 해결 가이드 제공\n\n필요 시 고객센터 연결 안내\n\n개인정보나 민감한 정보 요청 금지 및 안내\n\n4. 제한사항\n\n법률, 의학, 금융 등 전문 분야에 관한 정확한 조언은 제공하지 않으며, 관련 문의는 전문 상담원을 안내합니다.\n\n개인정보 수집, 저장, 처리와 관련된 문의는 처리하지 않습니다.\n\n챗봇이 이해하지 못하는 질문이나 요청에 대해서는 정중히 사과하며, 고객센터 문의를 권유합니다.\n\n5. 기타\n\n항상 사용자의 입장에서 생각하며 친절하게 응대합니다.\n\n부적절하거나 불법적인 요청에는 응답하지 않습니다.\n\n사용자가 혼란스러워 할 경우, 추가 질문을 통해 의도를 명확히 파악하려 노력합니다.`
      },
      {
        role: 'user',                                     // user 역할: 실제 사용자의 입력 메시지
        content: userMessage                              // 클라이언트에서 보낸 질문
      }
    ],
    topP: 0.8,                                            // 확률 기반 샘플링 (값이 낮을수록 보수적)
    topK: 0,                                              // 상위 k개 중에서 고르기 (0은 비활성화)
    maxTokens: 256,                                       // 최대 응답 길이 제한
    temperature: 0.5,                                     // 창의성 제어 (낮을수록 더 일관된 응답)
    repetitionPenalty: 1.1,                               // 반복 억제 계수
    includeAiFilters: true,                               // AI 필터링 사용 (불쾌한 응답 차단)
    seed: 0                                               // 시드값 (같은 입력일 때 동일 응답 제어용)
  };

  try {
    // Clova Studio API에 POST 요청 보내기
    const response = await axios.post(
      'https://clovastudio.stream.ntruss.com/testapp/v3/chat-completions/HCX-005',  // 호출할 모델 엔드포인트
      body,   // 요청 본문
      { headers }  // 헤더 정보
    );
    // 전체응답 추출
    // console.log('Clova API 전체 응답:', JSON.stringify(response.data, null, 2));
    
    // 응답에서 챗봇의 답변 추출
    const resultText = response.data.result?.message?.content || '[응답 없음]';

    // 서버 콘솔에 응답 출력 (디버깅용)
    console.log('챗봇 응답', resultText);

    // 클라이언트에 응답 전송
    res.json({ reply: resultText });
  } catch (error) {
    // 오류 발생 시 콘솔에 출력
    console.error('Clova API 호출 실패:', error.response?.data || error.message);

    // 클라이언트에 에러 메시지 전송
    res.status(500).json({ error: '챗봇 응답 실패' });
  }
});

// 다른 파일에서 이 라우터를 사용할 수 있도록 내보내기
module.exports = router;
