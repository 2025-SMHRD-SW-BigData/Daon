const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const cors = require('cors');

//mysql2 : node 서버와 Mysql DB를 연결해주는 모듈
const mysql = require('mysql2')

// 인증 확인 미들웨어
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: '인증 필요' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: '토큰 무효' });

    req.user = decoded;  // 이후 라우터에서 req.user.user_id 사용 가능
    next();
  });
};

// DB 연결 정보
let conn = mysql.createConnection({
  host: 'project-db-campus.smhrd.com',
  port: 3307,
  user: 'campus_25SW_BigData_p2_1',
  password: 'smhrd1',
  database: 'campus_25SW_BigData_p2_1'
});

conn.connect(err => {
  if (err) {
    console.error('유저 라우터 DB 연결 실패:', err);
  } else {
    console.log('유저 라우터 DB 연결 성공');
  }
});


router.post('/login', (req, res) => {
  const { user_id, password } = req.body;

  const sql = 'SELECT * FROM users WHERE user_id = ? AND password = ?';

  conn.query(sql, [user_id, password], (err, rows) => {
    if (err) {
      console.error('로그인 쿼리 오류:', err);
      return res.status(500).json({ success: false, message: '서버 오류' });
    }

    if (rows.length > 0) {
      const user = rows[0];

      // JWT 토큰 생성 (선택 사항)
      const token = jwt.sign({ user_id }, secretKey, { expiresIn: '1h' });

      // ✅ 쿠키에 JWT 저장
      res.cookie('token', token, {
        httpOnly: true,   // JS 접근 불가
        secure: false,    // HTTPS에서만 동작하려면 true (개발 시 false)
        sameSite: 'Lax',  // CSRF 방어용 (또는 Strict)
        maxAge: 3600000   // 1시간
      });

      // 로그인 성공 시 사용자 정보와 토큰을 응답
      res.status(200).json({
        success: true,
        message: '로그인 성공',
        // token, -> cookie에 저장할거라 뺐음
        user_id: user.user_id,
        username: user.username,
        nickname: user.nickname,
        role: user.role
      });

    } else {
      res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }
  });
});

//로그아웃
router.post('/logout', (req, res) => {
  res.clearCookie('token');  // ✅ 쿠키 제거
  res.json({ success: true, message: '로그아웃 완료' });
});

//토큰 인증 테스트용 라우터
router.get('/check-auth', verifyToken, (req, res) => {
  const user_id = req.user.user_id;
  const sql = 'SELECT user_id, username, nickname, role FROM users WHERE user_id = ?';
  conn.query(sql, [user_id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, user: rows[0] });
  });
});

// 회원가입

router.post('/join', (req, res) => {
  console.log('회원가입 요청 데이터:', req.body);
  const { user_id, password, confirmPassword, username, nickname, phone_number, role } = req.body;

  // 1. 필수 입력값 체크
  if (!user_id || !password || !confirmPassword || !username || !nickname || !phone_number || !role) {
    return res.status(400).json({ success: false, message: '모든 필드를 채워주세요.' });
  }

  // 2. 비밀번호 확인
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
  }

  // 3. user_id, nickname, phone_number 중복 확인
  const checkSql = `
    SELECT 
      (SELECT COUNT(*) FROM users WHERE user_id = ?) AS id_count,
      (SELECT COUNT(*) FROM users WHERE nickname = ?) AS nick_count,
      (SELECT COUNT(*) FROM users WHERE phone_number = ?) AS phone_count
  `;

  conn.query(checkSql, [user_id, nickname, phone_number], (err, results) => {
    if (err) {
      console.error('중복 체크 에러:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    const { id_count, nick_count, phone_count } = results[0];

    if (id_count > 0) {
      return res.status(400).json({ success: false, message: '이미 사용중인 아이디입니다.' });
    }
    if (nick_count > 0) {
      return res.status(400).json({ success: false, message: '이미 사용중인 닉네임입니다.' });
    }
    if (phone_count > 0) {
      return res.status(400).json({ success: false, message: '이미 등록된 휴대폰 번호입니다.' });
    }

    // 4. INSERT 실행
    const insertSql = `
      INSERT INTO users (user_id, password, username, nickname, phone_number, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    conn.query(insertSql, [user_id, password, username, nickname, phone_number, role], (err, result) => {
      if (err) {
        console.error('회원가입 실패:', err);
        return res.status(500).json({ success: false, message: 'DB 에러' });
      }
      return res.status(200).json({ success: true, message: '회원가입 성공' });
    });
  });
});


// 게시글 삭제
router.delete(`/community/delete/:post_id`, (req, res) => {
  const { post_id } = req.params;
  const sql = `DELETE FROM posts WHERE post_id = ?`;

  conn.query(sql, [post_id], (err, result) => {

    if (err) {
      console.error('게시글 삭제 실패:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    return res.status(200).json({ success: true, message: '삭제 성공' });
  });
})

router.post('/find-id', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: '이름과 휴대폰번호를 입력하세요.' });
  }
  conn.query('SELECT user_id FROM users WHERE username =? AND phone_number =?', [name, phone], (err, rows) => {
    if (err) {
      console.error('아이디 찾기 쿼리 실패:', err);
      return res.status(500).json({ error: '서버 오류' });
    }

    if (rows.length > 0) {
      return res.status(200).json({ id: rows[0].user_id })
    } else {
      return res.status(200).json({ id: null });
    }

  })
})

router.post('/find-pw', (req, res) => {
  const { name, id } = req.body
  if (!name || !id) {
    return res.status(400).json({ error: '이름과 아이디를 입력하세요.' });
  }
  conn.query('SELECT password FROM users WHERE username =? AND user_id =? ', [name, id], (err, rows) => {
    if (err) {
      console.error('비밀번호 찾기 쿼리 실패:', err);
      return res.status(500).json({ error: '서버 오류' })
    }
    if (rows.length > 0) {
      return res.status(200).json({ pw: rows[0].password })
    }
    else {
      return res.status(200).json({ pw: null });
    }
  })
})


module.exports = router;