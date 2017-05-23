var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../schemas/healthCenter');
var studentDb = require('../schemas/students');
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

router.get('/get/:_id',function(req,res){
    db.findOne({'_id':req.params._id}).exec(function(err,hc){
        if(err){
            throw err;
        } else {
            res.json(hc);
        }
    });
});

router.get('/all',function(req,res){
    db.find({}).exec(function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.post('/remove', function(req, res) {
    db.findOne({ _id: req.body._id }).remove().exec(function(){

    });
    studentDb.update({hc:req.body._id}, {hc: null},{"multi": true},function(err,num){
        console.log("updatet :")
        res.json({ "error": false })
    })
    
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