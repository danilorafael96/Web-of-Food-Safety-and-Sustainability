var express = require('express');
var MapaDAO=  require ('../models/MapaDAO');
var router = express.Router();

router.get('/',function(req,res,next){
    MapaDAO.getProdLocalOD(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports=router;