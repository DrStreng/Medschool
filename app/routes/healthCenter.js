var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../schemas/healthCenter');
mongoose.Promise     = global.Promise;

router.post('/add',function(req,res){

    var newHC = new db({
        _id     : mongoose.Types.ObjectId(),
        name    : req.body.name,
        fullName: req.body.fullName,
        address : req.body.address,
        isMine  : req.body.isMine
    });

   newHC.save(function(err,data){
       if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
   });
})

router.get('/all',function(req,res){
    db.find({}).exec(function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.post('/edit',function(req,res){

   db.findOneAndUpdate({_id:req.body._id},{$set:{
        name      : req.body.name,
        fullName  : req.body.fullName,
        address   : req.body.address,
        isMine     : req.body.isMine
   }},function(error){
       if(!error) res.json({"error":false});
       else res.json({"error":true});
   });

})


module.exports = router;