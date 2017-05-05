var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentDb = require('../schemas/schools');
var tools = require('./funct/tools');
mongoose.Promise     = global.Promise;

router.get('/get/:_id',function(req,res){
    studentDb.findOne({'_id':req.params._id}).populate('klasa').exec(function(err,school){
        if(err){
            throw err;
        } else {
            res.json(school);
        }
    })
});

router.post('/getById',function(req,res){
    studentDb.findOne({'_id':req.body._id}).populate('klasa').exec(function(err,school){
        if(err){
            throw err;
        } else {
            res.json(school);
        }
    })
});

router.get('/all',function(req,res){
    studentDb.find({}).deepPopulate('klasa').sort('nazwa').exec(function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.get('/allStud',function(req,res){
    studentDb.find({}).deepPopulate('klasa.uczniowie').exec(function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});


router.post('/add',function(req,res){

    var szkola = new studentDb({
        _id     : mongoose.Types.ObjectId(),
        nazwa   : req.body.name,
    });

   szkola.save(function(err,data){
       if(err){
            console.log(err);
       } else {
           res.json(data);
       }
   })
});

router.post('/getBySchoolId',function(req,res){
   studentDb.findOne({_id: req.body._id }).populate('klasa').exec(function(err,data){
        if(err){
            console.log(err);
        } else {
             res.json(data);
        }
    });
});


module.exports = router;