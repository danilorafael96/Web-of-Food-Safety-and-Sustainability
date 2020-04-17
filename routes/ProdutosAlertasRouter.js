var express = require('express');
var ProdutosAlertasDAO=  require ('../models/ProdutosAlertasDAO');
var router = express.Router();

router.get('/',function(req,res,next){
    ProdutosAlertasDAO.getProdsInfo(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})