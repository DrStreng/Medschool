var mongoose = require('mongoose');
var db = require('../../schemas/schoolClass');
var studentDb = require('../../schemas/schools');
mongoose.Promise     = global.Promise;

 module.exports = {

        getAllFromClass : function(req,res){
                db.find({}).exec(function(err,data){
                    if(err){
                        console.log(err);
                    } else {
                        res.json(data);
                    }
            });
        },
        addClass : function(req,res){
            var klasa = new db({
                _id     : mongoose.Types.ObjectId(),
                nazwa   : req.body.name,
            });

            klasa.save(function(err,data){
                if(err){
                        console.log(err);
                } else {
                            var schoolId = req.body.school;
                            var classId  = data._id
                            studentDb.findOneAndUpdate({_id:schoolId},{$push:{"klasa":classId}}).exec(function(err,done){
                                if(!err) res.json({'error':false});
                                else res.json({'error':true});
                            });
                }
            });
        },
        getClassById: function(req,res){
            db.findOne({'_id':req.params._id},function(err,school){
                if(err){
                    throw err;
                } else {
                    res.json(school);
                }
            })
        },
        init : function(){

            studentDb.find({ nazwa: '---' },function(err,data){
                if(err){

                } else {
                    if(data.length == 0){

                        var notSet = new studentDb({
                            _id: mongoose.Types.ObjectId(),
                            nazwa : '---'
                        });

                        var klasa = new db({
                            _id: mongoose.Types.ObjectId(),
                            nazwa : '---'
                        });

                        notSet.save(function(err,school){
                            klasa.save(function(err,schoolclass){
                                studentDb.findOneAndUpdate({_id:school._id},{$push:{"klasa":schoolclass._id}}).exec(function(err,done){
                                   
                                });
                            });
                        });
                    }
                }
            });
        }

 }

