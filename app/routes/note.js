var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../schemas/note');
mongoose.Promise     = global.Promise;

router.post('/add',function(req,res){

    var newNote = new db({
        _id     : mongoose.Types.ObjectId(),
        title   : req.body.title,
        content : req.body.content,
        details : req.body.details,
        student : req.body.student
    });

   newNote.save(function(err,data){
       if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
   });
});

router.get('/get',function(req,res){
    db.find({},function(err,data){
          if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
    })
});
router.get('/getByStudent/:_id',function(req,res){
    db.find({'student':req.params._id},function(err,data){
          if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
    })
});

router.get('/get/:_id',function(req,res){
    db.findOne({'_id':req.params._id},function(err,data){
          if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
    })
});

router.post('/edit',function(req,res){
   db.findOneAndUpdate({_id:req.body._id},{$set:{
        title   : req.body.title,
        content : req.body.content,
        details : req.body.details,
        dateEdit: new Date()
   }},function(error){
       if(!error) res.json({"error":false});
       else res.json({"error":true});
   });
});
router.post('/remove', function(req, res) {
    db.findOne({ _id: req.body._id }).remove().exec(function(){
        res.json({"error":false})
    });
});




module.exports = router;