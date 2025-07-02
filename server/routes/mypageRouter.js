const express = require('express')
const router = express.Router();

const cors = require('cors');

//mysql2 : node 서버와 Mysql DB를 연결해주는 모듈
const mysql = require('mysql2')


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

router.use(cors());


//마이페이지 조회시 필요 정보 넘겨주는 넘
router.get('/data', (req, res) => {
    const { user_id } = req.query;
    const sql = `SELECT f.favorite_id, f.name, f.path
                 FROM favorites f INNER JOIN user_favorites u
                 ON f.favorite_id = u.favorite_id
                 WHERE u.user_id = ?`;

    conn.query(sql, [user_id], (err, result) => {

        if (err) {
            console.error('즐겨찾기 조회 실패:', err);
            return res.status(500).json({ message: '서버 에러' });
        }

        return res.status(200).json({ 
            message: '즐겨찾기 조회 성공',
            favorites: result //즐겨찾기 목록 다 반환해주는건가?
         });
    });
})

module.exports = router;

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