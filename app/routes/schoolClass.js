var express = require('express');
var router = express.Router();
var tools = require('./funct/tools');

router.get('/all',function(req,res){
    tools.getAllFromClass(req,res);
});

router.post('/add',function(req,res){
    tools.addClass(req,res);
});

router.get('/get/:_id',function(req,res){
    tools.getClassById(req,res);
});

module.exports = router;