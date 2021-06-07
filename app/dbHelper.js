var mysql = require('mysql');

var con;
function init(){
    con = mysql.createConnection({
        host: "10.235.1.209",
        port: "33006",
        user: "root",
        password: "12345",
        database: "vehiclesapp_prod"
    });
}

function query(query, values, callback){
    let sql = mysql.format(query, values);
    con.query(sql, callback);
}

module.exports = {
    init: init,
    query: query,
}