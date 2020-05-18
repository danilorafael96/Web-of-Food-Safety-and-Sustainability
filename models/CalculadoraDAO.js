var pool = require('./MysqlConfig').pool;

module.exports.getTiposTransp=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select * from TiposTransporte",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.getLocais=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select prodTransp_quantidade,local_cidadeOrigem, local_cidadeDestino from Locais, ProdutosAlimentares,ProdutosTransportes, Transportes where local_prod_id=prod_id and prodTransp_prod_id=prod_id and transp_id=prodTransp_transp_id order by local_id",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}