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

// 게시글 및 해당 댓글 삭제 라우터
router.delete('/delete/:post_id', (req, res) => {
    const postId = req.params.post_id;
    const deleteCommentsSql = 'DELETE FROM comment WHERE post_id = ?';
    const deletePostSql = 'DELETE FROM post WHERE post_id = ?';

    // 1. 댓글 먼저 삭제
    conn.query(deleteCommentsSql, [postId], (err, result) => {
        if (err) {
            console.error('댓글 삭제 중 에러:', err);
            return res.status(500).json({ message: '댓글 삭제 실패' });
        }
        // 2. 댓글 삭제가 끝난 후 게시글 삭제
        conn.query(deletePostSql, [postId], (err, result) => {
            if (err) {
                console.error('게시글 삭제 중 에러:', err);
                return res.status(500).json({ message: '게시글 삭제 실패' });
            }

            res.status(200).json({ message: '게시글과 댓글이 모두 삭제되었습니다.' });
        });
    });
});


//내 게시글 댓글알림
router.post('/comments/notice', (req, res) => {
    const { user_id } = req.body

    const sql = `SELECT c.comment_id, c.content
                 FROM post p 
                JOIN comment c ON p.post_id = c.post_id
                 WHERE p.user_id = ?        -- 내가 작성한 글
                 AND c.user_id != ?       -- 남이 단 댓글
                 AND c.checked = FALSE
                 ORDER BY c.created_at ASC
    `;
    conn.query(sql, [user_id, user_id], (err, result) => {
        if (err) {
            console.error('업뎃된 댓글 조회 중 에러:', err);
            return res.status(500).json({ message: '업뎃 댓글 조회 실패' });
        } else {
            res.status(200).json({ result: result });
        }

    })

})

// 댓글 알림 확인 처리 (알림창 닫을 때)
router.post('/comments/notice/clear', (req, res) => {
    const { user_id } = req.body;

    const sql = `
        UPDATE comment
        JOIN (
            SELECT c.comment_id
            FROM post p 
            JOIN comment c ON p.post_id = c.post_id
            WHERE p.user_id = ?
              AND c.user_id != ? 
              AND c.checked = FALSE
        ) AS sub ON comment.comment_id = sub.comment_id
        SET comment.checked = TRUE;
    `;


    conn.query(sql, [user_id,user_id], (err, result) => {
        if (err) {
            console.error('알림 확인 처리 실패:', err);
            return res.status(500).json({ message: '알림 상태 변경 실패' });
        }
        res.status(200).json({ message: '알림 확인됨' });
    });
});

// 해당 라우터 모듈을 외부에서 사용할 수 있도록 export
module.exports = router;
