var pool = require('./MysqlConfig').pool;

module.exports.getTiposTransp=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select prod_nome, tipoTransp_nome, tipoTransp_combustivel, prodTransp_quantidade,local_cidadeOrigem, local_cidadeDestino, tipoTransp_pegadaEcoKm, local_distTrajetoKm from Locais, ProdutosAlimentares,ProdutosTransportes, Transportes,TiposTransporte where local_prod_id=prod_id and prodTransp_prod_id=prod_id and transp_id=prodTransp_transp_id and transp_tipoTransp_id=tipoTransp_id order by local_id",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}