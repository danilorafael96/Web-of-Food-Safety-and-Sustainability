var pool = require('./MysqlConfig').pool;

module.exports.getProdLocalOD=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("SELECT prodOrigem_lat,prodOrigem_long,prodDestino_lat,prodDestino_long FROM ProdutosLocalOrigem,ProdutosLocalDestino",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}