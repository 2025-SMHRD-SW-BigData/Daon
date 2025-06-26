const express = require('express')
const router = express()

const cors = ('cors');

//mysql2 : node 서버와 Mysql DB를 연결해주는 모듈
const mysql = require('mysql2')


//연결 정보
let conn = mysql.createConnection({
    host: 'project-db-campus.smhrd.com',
    port: 3307,
    user: 'campus_25SW_BigData_p2_1',
    password: 'smhrd1',
    database: 'campus_25SW_BigData_p2_1'
})

router.post('/login', (req, res) => {
    console.log(req.body)

   
})

module.exports = router;