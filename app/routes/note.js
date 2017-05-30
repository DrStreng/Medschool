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

// router.get('/all',function(req,res){

// });

// router.post('/remove', function(req, res) {

// });


// router.post('/edit',function(req,res){

// })


module.exports = router;