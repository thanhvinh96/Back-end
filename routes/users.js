var db = require('../models/database')
var express = require( 'express' );
var router = express.Router();
var bcrypt = require('bcryptjs');

// đọc users
router.get('/',(req, res)=> {
  let limit = ``;
  if( req.query._limit!=undefined && isNaN(req.query._limit)==false){
      let sosp = Number(req.query._limit);
      if(sosp<=0) sosp = 10;
      limit = `limit 0,${sosp}`;
  }
  let sort = ``;
  if(req.query._sort!=undefined) {
      let str = req.query._sort;
      sort = ` ORDER BY ${str} asc`;
  }
  let sql = `SELECT * FROM users ${sort} ${limit}`;    
   console.log(`sql: ${sql}`);
  db.query(sql,(err,arr)=>{
      if(err) res.json({'thongbao':'Co loi' + err});
      else res.json(arr);
  });
});
// thêm user
router.post('/adduser', async function(req,res){
  let {username,hovaten,password,email,diachi,dien_thoai} = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  let  sql = `INSERT INTO users (username,hovaten,password,email,diachi,dien_thoai) values('${username}','${hovaten}','${hashedPassword}','${email}','${diachi}','${dien_thoai}')`;
  db.query(sql,(err,d)=>{
      if(err) res.json({'lỗi':err});
      else res.json({'thông báo':`đã thêm user thành công`});
  });
});
// sửa
router.put('/updateuser/:id',(req,res)=>{
  let data = req.body;
  let id = req.params.id;
  let  sql = " UPDATE users SET ? WHERE id=?" ;
  db.query(sql,[data,id] ,(err,d)=>{
      if(err) res.json({'lỗi':err});
      else res.json({'thông báo':`đã sửa thành công`});
  });
});
module.exports = router;
