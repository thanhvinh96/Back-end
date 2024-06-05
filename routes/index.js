var db = require('../models/database')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/spmoi/:sosp',(req, res, next)=> {
  if(isNaN(req.params.sosp)==true) {
  res.json({'Thông báo':`Sai tham số`});
  return;
  }
  let sosp = req.params.sosp; if(sosp<=0) sosp=10;
  let sql = `SELECT * FROM san_pham WHERE an_hien = 1 ORDER BY ngay_dang desc LIMIT 0,${sosp}`;
  db.query(sql,(err,data)=>{
    if (err) res.json('Thông báo:'`lỗi ${err}`);
    else res.json(data);
  });
});
router.get('/spxemnhieu/:sosp',(req, res, next)=> {
  if(isNaN(req.params.sosp)==true) {
  res.json({'Thông báo':`Sai tham số`});
  return;
  }
  let sosp = req.params.sosp; if(sosp<=0) sosp=10;
  let sql = `SELECT * FROM san_pham WHERE an_hien = 1 ORDER BY luot_xem desc LIMIT 0,${sosp}`;
  db.query(sql,(err,data)=>{
    if (err) res.json('Thông báo:'`lỗi ${err}`);
    else res.json(data);
  });
});
router.get('/spnoibat/:sosp',(req, res, next)=> {
  if(isNaN(req.params.sosp)==true) {
  res.json({'Thông báo':`Sai tham số`});
  return;
  }
  let sosp = req.params.sosp; if(sosp<=0) sosp=10;
  let sql = `SELECT * FROM san_pham WHERE an_hien = 1 AND sp_hot = 1 ORDER BY ngay_dang desc LIMIT 0,${sosp}`;
  db.query(sql,(err,data)=>{
    if (err) res.json('Thông báo:'`lỗi ${err}`);
    else res.json(data);
  });
});
router.get('/sp/:id',(req,res)=>{
  let id = req.params.id;
  let sql = `
    SELECT * FROM san_pham WHERE id_sp=${id};
    SELECT * FROM thuoc_tinh WHERE id_sp=${id};
  `;
  db.query(sql,(err,arr)=>{
    if (err) res.json('Thông báo:'`lỗi ${err}`);
    else {
      let sp = arr[0][0];
      let tt = arr[1][0];
      var obj = Object.assign(sp,tt);
      res.json(obj);
    }
  });
});
router.get('/sp_nhasx/:id',(req,res)=>{
  let id = req.params.id;
  let sql = `
  SELECT * FROM san_pham WHERE an_hien = 1 AND id_nhasx = ${id} ORDER BY ngay_dang desc;
  `;
  db.query(sql,(err,data)=>{
    if(err) res.json(err);
    else{
      res.json(data);
    }
  })
});

// nhà sản xuất
router.get('/list_nhasx',(req,res)=>{
  let sql = `
    SELECT * FROM nha_sx WHERE an_hien=1 ORDER BY thu_tu asc
  `;
  db.query(sql, (err, data) => {
    if(err) res.json(err);
    else res.json(data);
  });
});

module.exports = router;
