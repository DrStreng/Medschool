var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../schemas/contacts');
mongoose.Promise     = global.Promise;

router.post('/add',function(req,res){

    var newContact = new db({
        _id     : mongoose.Types.ObjectId(),
        person   : req.body.person,
        num : req.body.num,
        show: req.body.show
    });

   newContact.save(function(err,data){
       if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
   });
});



module.exports = router;