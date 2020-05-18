var express = require('express');
var CalculadoraDAO=  require ('../models/CalculadoraDAO');
var router = express.Router();

router.get('/',function(req,res,next){
    CalculadoraDAO.getTiposTransp(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.get('/locais',function(req,res,next){
    CalculadoraDAO.getLocais(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports=router;