var pool = require('./MysqlConfig').pool;

module.exports.getProdsInfo=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select prod_id, prod_referencia, prod_nome, categ_id, categ_nome, local_cidadeOrigem, local_cidadeDestino, prod_dataProducao, prodTransp_quantidade  from CategoriaProdutos, ProdutosAlimentares, Transportes, ProdutosTransportes, Locais where prod_categ_id = categ_id and prodTransp_prod_id=prod_id and prodTransp_transp_id=transp_id and local_prod_id=prod_id and transp_alerta_id is NULL UNION select prod_id, prod_referencia, prod_nome, categ_id, categ_nome, local_cidadeOrigem, local_cidadeDestino, prod_dataProducao, prodTransp_quantidade from CategoriaProdutos, ProdutosAlimentares, Transportes, ProdutosTransportes, Locais where prod_categ_id = categ_id and prodTransp_prod_id=prod_id and prodTransp_transp_id=transp_id and local_prod_id=prod_id and transp_alerta_id is NOT NULL order by prod_referencia",function(err,results){
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

        conn.query("select DISTINCT prod_referencia, prod_nome, local_cidadeOrigem, local_cidadeDestino, alerta_info, alerta_data, entidade_nome  from CategoriaProdutos, ProdutosAlimentares, Transportes, ProdutosTransportes, Locais, Alertas, EntidadesAlertas, TiposTransporte where prod_categ_id = categ_id and prodTransp_prod_id=prod_id and prodTransp_transp_id=transp_id and local_prod_id=prod_id and transp_tipoTransp_id=tipoTransp_id and transp_alerta_id=alerta_id and alerta_entidade_id=entidade_id order by prod_referencia",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.getListaCategorias=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select * from CategoriaProdutos",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}