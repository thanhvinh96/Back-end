var db = require('../models/database')
var express = require( 'express' );
var router = express.Router();
//đọc nhà sản xuất
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
    let sql = `SELECT * FROM nha_sx ${sort} ${limit}`;    
     console.log(`sql: ${sql}`);
    db.query(sql,(err,arr)=>{
        if(err) res.json({'thongbao':'Co loi' + err});
        else res.json(arr);
    });
});

// thêm mới nhà sản xuất vào CSDL
router.post('/addnsx',(req,res)=>{
    let data = req.body;
    let  sql = "INSERT INTO nha_sx SET ?" ;
    db.query(sql,data ,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã chèn sp thành công`});
    });
});
// sửa nhà sản xuất
router.put('/updatensx/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let  sql = " UPDATE nha_sx SET ? WHERE nhasx_id=?" ;
    db.query(sql,[data,id],(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã cập nhật sp thành công`});
    });
});
//xóa nhà sản xuất
router.delete('/deletensx/:id',(req,res)=>{
    let id = req.params.id;
    let  sql = " DELETE FROM nha_sx WHERE nhasx_id=?" ;
    db.query(sql,id,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã xóa sp thành công`});
    });
});

module.exports = router;
