var mysql = require ('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database: 'shopping',
    multipleStatements:true
});
db.connect(function (err) {
   if (!err) { console.log("Database Connected!");}  
   else{console.log("Failed to connect with Database"); }  });

module.exports=db;
