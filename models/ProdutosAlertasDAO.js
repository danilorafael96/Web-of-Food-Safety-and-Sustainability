var pool = require('./MysqlConfig').pool;

module.exports.getProdsInfo=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select * from CategoriasProdutos,ProdutosAlimentares where prod_prodCat_id = prodCat_id and prod_alerta_id is NULL",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}


module.exports.getProdsAlertasInfo=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select * from Alertas,EntidadesAlertas,EstadosClassifAlertas,CategoriasProdutos,ProdutosAlimentares,TiposAlertas where alerta_estadoClassif_id=estadoClassif_id and alerta_ent_id=ent_id and alerta_tipoAlerta_id=tipoAlerta_id and prod_prodCat_id = prodCat_id and prod_alerta_id is NOT NULL",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}