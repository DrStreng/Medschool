
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var schoolClassSchema = new Scheam({
    _id     : String,
    nazwa   : String,
});

var schoolClass = mongoose.model('schoolClass',schoolClassSchema);
schoolClassSchema.plugin(deepPopulate);

module.exports = schoolClass;
