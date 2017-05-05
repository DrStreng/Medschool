var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentDb = require('../schemas/students');
var db = require('../schemas/schoolClass');
mongoose.Promise     = global.Promise;

router.get('/all',function(req,res){
    studentDb.find({}).deepPopulate('szkola,nr_klasy').exec(function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.get('/get/:_id',function(req,res){
    studentDb.findOne({'_id':req.params._id}).deepPopulate('szkola,nr_klasy').exec(function(err,person){
        if(err){
            throw err;
        } else {
            res.json(person);
        }
    });
});

router.post('/add',function(req,res){

    var student = new studentDb({
        _id     : mongoose.Types.ObjectId(),
        imie    : req.body.imie,
        nazwisko: req.body.nazwisko,
        data_ur : req.body.data_ur,
        pesel   : req.body.pesel,
        nr_klasy: req.body.nr_klasy,
        szkola  : req.body.szkola
    });

   student.save(function(err,data){
       if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
   });
})

router.post('/edit',function(req,res){

   studentDb.findOneAndUpdate({_id:req.body._id},{$set:{
        imie    : req.body.imie,
        nazwisko: req.body.nazwisko,
        data_ur : req.body.data_ur,
        pesel   : req.body.pesel,
        nr_klasy: req.body.nr_klasy,
        szkola  : req.body.szkola,
        details : req.body.details,

   }},function(error){
       if(!error) res.json({"error":false});
       else res.json({"error":true});
   });

})


module.exports = router;
