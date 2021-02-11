var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res) {
  db.query('select id , create_date from todo_date',(err,rows)=>{
    if(err)throw err;
    res.header('Access-Control-Allow-Origin','*');
    res.json({todo_date:rows});
  });
});

router.get('/add',(req,res)=>{
  var today = new Date().toISOString().split("T")[0];
  var sql = `select create_date from todo_date where create_date=DATE(now())`;
  db.query(sql,(err,rows)=>{
    if(err)throw err;
    // 배열 빈공간 확인 즉 오늘날짜의 데이터가 있는지 확인
    if(rows == false){
      db.query(`insert into todo_date values(0,'${today}',1)`,(err,rows)=>{
        if(err)throw err;
        db.query('select create_date from todo_date',(err,rows)=>{
          if(err)throw err;
          res.header('Access-Control-Allow-Origin','*');
          res.json({todo_date:rows});
        });
      });
    }
    else{
      res.header('Access-Control-Allow-Origin','*');
      res.json({todo_date:'err'});
    }
  });
})

module.exports = router;
