let express = require('express');
let router = express.Router();
let db = require('../database/db');

//투두 리스트의 컬러 리스트를 출력
router.get("/color",(req,res)=>{
  let sql = `select * from todo_color`;
  db.query(sql,(err,rows)=>{
    if(err)throw err;
    if(rows !== undefined){
      res.header('Access-Control-Allow-Origin','*');
      res.json({color:rows});
    }
    else{
      res.header('Access-Control-Allow-Origin','*');
      res.json({color:'err'});
    }
  });
});

// 날짜별 리스트 출력 
router.get('/', function(req, res) {
  db.query('select id , create_date from todo_date',(err,rows)=>{
    if(err)throw err;
    res.header('Access-Control-Allow-Origin','*');
    res.json({todo_date:rows});
  });
});

// 날짜별 투두 데이터 리스트 출력
router.get('/get_list',function(req,res){
  let id = req.query.id;
  let date = req.query.date;
  let sql = `SELECT * FROM todo_date ,todo_list WHERE create_date="${date}" AND todo_list.todo_date_id=${id}`;
  console.log(sql);
  db.query(sql,(err,rows)=>{
    if(err){
      res.header('Access-Control-Allow-Origin','*');
      res.json({todo_list:err});
      throw err
    }
    else{
      res.header('Access-Control-Allow-Origin','*');
      res.json({todo_list:rows});
    }
  })
});

// 스탑워치 하기위한 데이터 가져오기
router.post('/get',(req,res)=>{
  let id = req.body.id;
  let todo_date_id = req.body.todo_date_id;
  console.log(`id : ${id} && todo_date_id : ${todo_date_id}`);
  let sql = `SELECT * FROM todo_list WHERE id=${id} AND todo_date_id = ${todo_date_id}`
  db.query(sql,(err,rows)=>{
    if(err) throw err;
    if(rows !== undefined){
      res.header('Access-Control-Allow-Origin','*');
      res.json({data:rows});
    }
    else{
      res.header('Access-Control-Allow-Origin','*');
      res.json({data:'err'});
    }
  });
})

router.post('/create',(req,res)=>{
  let id = req.body.id;
  let color = req.body.color;
  let todo = req.body.todo;
  let sql = `INSERT INTO todo_list values(0,"${todo}","${color}","00:00:00",${id});`
  db.query(sql,(err,row)=>{
    if(err)throw err;
    if(row == undefined){
      res.header('Access-Control-Allow-Origin','*');
      res.json({data:'err'});
    }
    else{
      res.header('Access-Control-Allow-Origin','*');
      res.json({data:row});
    }
  });
});

router.post('/update',(req,res)=>{
  let id = req.body.id;
  let time = req.body.timer;
  let sql = `update todo_list set timer='${time}' where id = ${id}`;
  db.query(sql,(err,rows)=>{
    if(err)throw err;
    res.header('Access-Control-Allow-Origin','*');
    res.json({data:true});
  });
});

module.exports = router;