const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/userRouter');
const chatbotRouter = require('./routes/chatbotRouter');
const communityRouter = require('./routes/communityRouter');

// CORS 미들웨어: 모든 도메인 허용 (개발용)
app.use(cors());

// POST 요청 바디 파싱 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우터 등록
app.use('/api',userRouter);
app.use('/',chatbotRouter);
app.use('/community',communityRouter)

// 서버 실행
app.listen(3003, () => {
  console.log('Server is running on port : 3003');
});
