var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../schemas/contacts');
mongoose.Promise     = global.Promise;

router.post('/add',function(req,res){

    var newContact = new db({
        _id      : mongoose.Types.ObjectId(),
        person   : req.body.person,
        num      : req.body.num,
        prefix   : req.body.prefix
    });

   newContact.save(function(err,data){
       if(err){
            console.log(err);
       } else {
            res.json(data); 
       }
   });
});
router.post('/remove',function(req,res){
    db.findOne({ '_id': req.body.contact_id}).remove().exec(function(err,data){
        if(err){
            res.json({"success":false})
        }else{
            res.json({"success":true})
        }
    })
})

router.post('/edit',function(req,res){
   db.findOneAndUpdate({_id:req.body._id},{$set:{
        person      : req.body.person,
        num         : req.body.num,
        prefix      : req.body.prefix,
   }},function(error){
       if(!error) res.json({"error":false});
       else res.json({"error":true});
   });

})



module.exports = router;