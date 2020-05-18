var pool = require('./MysqlConfig').pool;

module.exports.getProdLocalOD=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }

        conn.query("select prod_dataProducao, prod_dataValidade, local_cidadeOrigem, local_cidadeDestino, local_cidadeOLat, local_cidadeOLong, local_cidadeDLat, local_cidadeDLong, localParagem_cidade, localParagem_cidadeLat, localParagem_cidadeLong, localParagem_ordem, tipoTransp_nome from Locais, LocaisParagens, ProdutosAlimentares, TiposTransporte where prod_id=local_prod_id and local_id=localParagem_local_id and localParagem_tipoTransp_id=tipoTransp_id",function(err,results){
            conn.release();
            if(err){
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

// module.exports.getFiltroOD=function(callback,next){
//     pool.getConnection(function(err,conn){
//         if(err){
//             callback(err, { code: 500, status: "Erro na conexão da base de dados" })
//         }

//         conn.query("select local_cidadeOrigem, local_cidadeDestino, local_cidadeOLat, local_cidadeOLong, local_cidadeDLat, local_cidadeDLong, localParagem_cidade, localParagem_cidadeLat, localParagem_cidadeLong from Locais, LocaisParagens, ProdutosAlimentares where prod_id=local_prod_id and local_id=localParagem_local_id",function(err,results){
//             conn.release();
//             if(err){
//                 callback(err, { code: 500, status: "Erro na conexão da base de dados" })
//                 return;
//             }
//             callback(false,{code:200,status:"ok",data:results})
//         })
//     })
// }