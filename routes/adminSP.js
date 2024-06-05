var db = require('../models/database')
var express = require( 'express' );
var router = express.Router();
//đọc sản phẩm
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

    let sql = `SELECT id_sp,tensp,giasp,gia_km,img,luot_xem,sp_hot,an_hien,date_format(ngay_dang,'%d-%m-%y')AS ngay_dang,mau_sac,can_nang,tinh_chat FROM san_pham ${sort} ${limit}`;    
     console.log(`sql: ${sql}`);
    db.query(sql,(err,arr)=>{
        if(err) res.json({'thongbao':'Co loi' + err});
        else res.json(arr);
    });
});
//xem chi tiết 1 sản phẩm
router.get('/:id', (req,res)=>{
    let id = req.params.id;
    if(isNaN(id)==true){
        res.json({'Thông báo':`sản phẩm ${id} không tồn tại`})
        return;
    }
    let sql = `SELECT id_sp,tensp,giasp,gia_km,img,luot_xem,sp_hot,an_hien,date_format(ngay_dang,'%d-%m-%y')AS ngay_dang,mau_sac,can_nang,tinh_chat FROM san_pham WHERE id_sp=?  ` ; 
    db.query(sql,id,(err,arr)=>{
        if(err) res.json({'lỗi':err})
        else if(arr.length==0) res.json({'thông báo':`sanr phẩm ${id} không tồn tại`});
        else res.json(arr[0]);
    });
});
// thêm mới sản phẩm vào CSDL
router.post('/addsp',(req,res)=>{
    let data = req.body;
    let  sql = "INSERT INTO san_pham SET ? " ;
    db.query(sql,data ,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã chèn sp thành công`});
    });
});
// sửa sản phẩm
router.put('/update/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let  sql = " UPDATE san_pham SET ? WHERE id_sp=?" ;
    db.query(sql,[data,id],(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã cập nhật sp thành công`});
    });
});
//xóa sản phẩm
router.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;
    let  sql = " DELETE FROM san_pham WHERE id_sp=?" ;
    db.query(sql,id,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã xóa sp thành công`});
    });
});

module.exports = router;