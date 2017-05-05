var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var schoolSchema = new Scheam({
    _id     : String,
    nazwa   : String,
    klasa   : [{ type:String, ref: 'schoolClass'}],
    fullname: String
});

var school = mongoose.model('school',schoolSchema);
schoolSchema.plugin(deepPopulate);

module.exports = school;