const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2');

// CORS 허용

// DB 연결
const conn = mysql.createConnection({
    host: 'project-db-campus.smhrd.com',
    port: 3307,
    user: 'campus_25SW_BigData_p2_1',
    password: 'smhrd1',
    database: 'campus_25SW_BigData_p2_1',
});

conn.connect((err) => {
    if (err) {
        console.error('[QNA 라우터] DB 연결 실패:', err);
    } else {
        console.log('[QNA 라우터] DB 연결 성공');
    }
});

// ✅ 1. 질문 등록 (POST /qna/write)
router.post('/questions', (req, res) => {
    const { question_title, question, user_id } = req.body;

    if (!question_title || !question || !user_id) {
        return res.status(400).json({ message: '모든 필드를 입력하세요.' });
    }

    const sql = `INSERT INTO qna (question_title, question, user_id) VALUES (?, ?, ?)`;
    conn.query(sql, [question_title, question, user_id], (err, result) => {
        if (err) {
            console.error('질문 등록 실패:', err);
            return res.status(500).json({ message: '서버 오류 발생' });
        }
        res.status(201).json({ message: '질문 등록 성공', qna_id: result.insertId });
    });
});

// ✅ 2. 질문 목록 조회 (GET /api/questions?user_id=xxx)
router.get('/questions', (req, res) => {
  const { user_id, role } = req.query;
  console.log('[질문 조회 요청]', { user_id, role });

  let sql;
  let params = [];

  if (role === 'counselor') {
    sql = `SELECT * FROM qna ORDER BY created_at DESC`;
  } else {
    if (!user_id) {
      return res.status(400).json({ message: 'user_id가 필요합니다.' });
    }
    sql = `SELECT * FROM qna WHERE user_id = ? ORDER BY created_at DESC`;
    params.push(user_id);
  }

  conn.query(sql, params, (err, rows) => {
    if (err) {
      console.error('질문 목록 조회 실패:', err);
      return res.status(500).json({ message: 'DB 오류' });
    }
    res.status(200).json(rows);
  });
});

// ✅ 3. 질문 상세 조회 (GET /api/question/:id)
router.get('/question/:id', (req, res) => {
    const qna_id = req.params.id;
    const sql = `SELECT * FROM qna WHERE qna_id = ?`;

    conn.query(sql, [qna_id], (err, rows) => {
        if (err) {
            console.error('질문 상세 조회 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: '질문이 존재하지 않습니다.' });
        }
        res.status(200).json(rows[0]);
    });
});

router.get('/answers/:qna_id', (req, res) => {
    const { qna_id } = req.params;
    const sql = 'SELECT a.*, u.nickname FROM answers a JOIN users u ON a.counselor_id = u.user_id WHERE a.qna_id = ?';
    conn.query(sql, [qna_id], (err, rows) => {
        if (err) {
            console.error('답변 조회 에러:', err);
            return res.status(500).json({ message: '답변 조회 실패' });
        }
        res.json(rows);
    });
});

router.post('/answer', (req, res) => {
    const { qna_id, counselor_id, answer } = req.body;
    if (!qna_id || !counselor_id || !answer) {
        return res.status(400).json({ message: '모든 필드를 입력하세요.' });
    }
    const sql = `INSERT INTO answers (qna_id, counselor_id, answer, answer_at) VALUES (?, ?, ?, NOW())`;
    conn.query(sql, [qna_id, counselor_id, answer], (err, result) => {
        if (err) {
            console.error('답변 등록 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        res.status(201).json({ message: '답변 등록 성공', answer_id: result.insertId });
    });
});
module.exports = router;