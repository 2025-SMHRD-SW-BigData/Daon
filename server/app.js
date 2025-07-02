const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/userRouter');
const chatbotRouter = require('./routes/chatbotRouter');
const communityRouter = require('./routes/communityRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const mypageRouter = require('./routes/mypageRouter');



// CORS 미들웨어: 모든 도메인 허용 (개발용)
app.use(cors());

// POST 요청 바디 파싱 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우터 등록
app.use('/user',userRouter); //http:/loclaasd:포트번호/user/find-id
app.use('/chatbot',chatbotRouter);
app.use('/community',communityRouter)
app.use('/',favoriteRouter)
app.use('/mypage',mypageRouter)


// 서버 실행
app.listen(3003, () => {
  console.log('Server is running on port : 3003');
});
