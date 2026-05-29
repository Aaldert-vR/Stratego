let server=require('./JSONrpc.js');
let mysql = require('mysql');
const rpcMethods=server.rpcMethods;
server.start();
server.updatePort(8082);
console.log(server.port());
server.start();
server.start();

let conn=mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ditisphpwwad1@3",
    database: "multiplayer_stratego"
});

conn.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
})
rpcMethods.test=function(params){
    if (params.token=="123456"){
        return "check";
    }
    else{
        return "Wrong token";
    }
}
let register=false
function registerResult(result){
    register=result;
}
rpcMethods.register = async (email=null, nickname=null, password=null) => {
    //if (email==null || nickname==null || password==null){
        //return "error: invalid params";
    //}
    let res=false;
    let sql="SELECT * FROM client;";
    console.log(sql);
    conn.query(sql, function(err, result, fields){
        if (err) throw err;
        console.log (result);
        console.log(fields);
        return result;
    });
    q= await conn.query(sql);
    console.log(q);
    return q.result;
}

rpcMethods.login= (mailOrNickname=null, password=null) =>{
    if (mailOrNickname==null || password==null){
        return "error: invalid params";
    }
}