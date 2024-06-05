var db = require('../models/database')
var express = require( 'express' );
var router = express.Router();

//đọc đơn hàng
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
    let sql = `SELECT * FROM don_hang ${sort} ${limit}`;    
     console.log(`sql: ${sql}`);
    db.query(sql,(err,arr)=>{
        if(err) res.json({'thongbao':'Co loi' + err});
        else res.json(arr);
    });
});
// thêm mới don_hang vào CSDL
router.post('/adddh',(req,res)=>{
    let data = req.body;
    let  sql = "INSERT INTO don_hang SET ?" ;
    db.query(sql,data ,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã thêm đơn hàng thành công`});
    });
});
// xóa đơn hàng
router.delete('/deletedh/:id',(req,res)=>{
    let id = req.params.id;
    let  sql = " DELETE FROM don_hang WHERE id=?" ;
    db.query(sql,id,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã xóa sp thành công`});
    });
});
// xem chi tiết đơn hàng
router.get('/chitietdh',(req, res)=> {
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
    let sql = `SELECT * FROM don_hang_chi_tiet ${sort} ${limit}`;    
     console.log(`sql: ${sql}`);
    db.query(sql,(err,arr)=>{
        if(err) res.json({'thongbao':'Co loi' + err});
        else res.json(arr);
    });
});

//  '/admin/dh/'
module.exports = router;
