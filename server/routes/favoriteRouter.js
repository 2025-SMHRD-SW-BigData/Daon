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

// 즐겨찾기 여부 조회 (GET)
router.get('/favorite', (req, res) => {
    const { user_id, page_title } = req.query;

    // 1. favorites 테이블에서 page_title로 favorite_id 조회
    const getFavoriteIdSql = `SELECT favorite_id FROM favorites WHERE name = ?`;
    conn.query(getFavoriteIdSql, [page_title], (err, result) => {
        if (err) return res.status(500).json({ error: 'favorite 조회 실패' });
        if (result.length === 0) return res.status(404).json({ error: 'favorite 존재하지 않음' });

        const favorite_id = result[0].favorite_id;

        // 2. user_favorites에서 해당 user가 즐겨찾기 했는지 조회
        const checkSql = `SELECT * FROM user_favorites WHERE user_id = ? AND favorite_id = ?`;
        conn.query(checkSql, [user_id, favorite_id], (err, rows) => {
            if (err) return res.status(500).json({ error: '조회 실패' });
            return res.json({ isFavorite: rows.length > 0 });
        });
    });
});

// 즐겨찾기 등록/삭제 및 확인
router.post('/favorite', (req, res) => {
    const { user_id, page_title } = req.body;

    // 1. page_title로 favorite_id 조회
    const getFavoriteId = `SELECT favorite_id FROM favorites WHERE name = ?`;
    conn.query(getFavoriteId, [page_title], (err, result) => {
        if (err) return res.status(500).json({ error: 'favorite 조회 실패' });
        if (result.length === 0) return res.status(404).json({ error: 'favorite 존재하지 않음' });

        const favorite_id = result[0].favorite_id;

        // 2. user_favorites 테이블에 존재하는지 확인
        const checkSql = `SELECT * FROM user_favorites WHERE user_id = ? AND favorite_id = ?`;
        conn.query(checkSql, [user_id, favorite_id], (err, rows) => {
            if (err) return res.status(500).json({ error: '조회 실패' });

            if (rows.length > 0) {
                // 이미 존재 → 삭제
                const deleteSql = `DELETE FROM user_favorites WHERE user_id = ? AND favorite_id = ?`;
                conn.query(deleteSql, [user_id, favorite_id], (err) => {
                    if (err) return res.status(500).json({ error: '삭제 실패' });
                    return res.json({ isFavorite: false });
                });
            } else {
                // 존재하지 않음 → 추가
                const insertSql = `INSERT INTO user_favorites (user_id, favorite_id) VALUES (?, ?)`;
                conn.query(insertSql, [user_id, favorite_id], (err) => {
                    if (err) return res.status(500).json({ error: '등록 실패' });
                    return res.json({ isFavorite: true });
                });
            }
        });
    });
});

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

module.exports = router;
