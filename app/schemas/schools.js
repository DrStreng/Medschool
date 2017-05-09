var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var schoolSchema = new Scheam({
    _id     : { type:String,default : null},
    nazwa   : { type:String,default : null},
    klasa   : [{ type:String, ref: 'schoolClass'}],
    fullname: { type:String, default : null},
});

var school = mongoose.model('school',schoolSchema);
schoolSchema.plugin(deepPopulate);

module.exports = school;