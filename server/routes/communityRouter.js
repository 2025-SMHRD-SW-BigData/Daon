// Express 모듈을 불러옴
const express = require('express')
// Express 라우터 객체 생성 (라우팅 분리를 위해 사용)
const router = express.Router();

// CORS(Cross-Origin Resource Sharing) 허용을 위한 모듈 불러오기
const cors = require('cors');

// mysql2 모듈을 불러와 Node.js와 MySQL 간 연결을 지원함
const mysql = require('mysql2')

// MySQL 데이터베이스 연결 정보 설정
let conn = mysql.createConnection({
    host: 'project-db-campus.smhrd.com', // DB 호스트 주소
    port: 3307,                          // 포트 번호 (기본은 3306)
    user: 'campus_25SW_BigData_p2_1',    // 사용자 계정
    password: 'smhrd1',                  // 비밀번호
    database: 'campus_25SW_BigData_p2_1' // 연결할 데이터베이스 이름
});

// DB 연결 시도 및 연결 성공/실패 여부 콘솔 출력
conn.connect(err => {
    if (err) {
        console.error('커뮤니티 라우터 DB 연결 실패:', err); // 실패 시 에러 메시지 출력
    } else {
        console.log('커뮤니티 라우터 DB 연결 성공');        // 성공 시 메시지 출력
    }
});

// 모든 라우터에서 CORS 허용 설정
router.use(cors());

router.post('/write', (req, res) => {
    console.log(req.body)
    const { title, content, author, region } = req.body;

    const sql = ` 
     INSERT INTO post (user_id, title, content, region) VALUES (?, ?, ?, ?)`

    conn.query(sql, [author, title, content, region], (err, result) => {
        if (err) {
            console.error('게시글 등록 에러:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
        // 성공 응답
        res.status(201).json({ message: '게시글이 등록되었습니다.' });
    });
})

router.get('/view', (req, res) => {
    const sql = `SELECT * FROM post ORDER BY created_at DESC`; // 최신글부터 정렬

    conn.query(sql, (err, results) => {
        if (err) {
            console.error('게시글 조회 에러:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
        res.json(results); // 결과를 JSON 형식으로 클라이언트에 보냄
    });
})


// 댓글 가져오기
router.get('/comments/:post_id', (req, res) => {
    const postId = req.params.post_id;
    const sql = `SELECT c.comment_id, c.content, c.user_id, u.nickname
                FROM comment c INNER JOIN users u 
                ON c.user_id = u.user_id
                WHERE c.post_id = ?
                ORDER BY c.created_at ASC`;

    conn.query(sql, [postId], (err, rows) => {
        if (err) {
            console.error('댓글 조회 에러:', err);
            return res.status(500).json({ message: '댓글 조회 실패' });
        }
        res.status(200).json(rows);
    });
});

// 댓글 등록
router.post('/comments', (req, res) => {
    const { post_id, user_id, content } = req.body;

    if (!user_id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });

    }

    const sql = 'INSERT INTO comment (post_id, user_id, content) VALUES (?, ?, ?)';

    conn.query(sql, [post_id, user_id, content], (err, result) => {
        if (err) {
            console.error('댓글 등록 에러:', err);
            return res.status(500).json({ message: '댓글 등록 실패' });
        }
        res.status(201).json({ message: '댓글이 등록되었습니다.' });
    });
});



// 해당 라우터 모듈을 외부에서 사용할 수 있도록 export
module.exports = router;
