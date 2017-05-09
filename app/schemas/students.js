var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var studentSchema = new Scheam({
    _id     : String,
    imie    : String,
    nazwisko: String,
    data_ur : Date,
    pesel   : String,
    sex     : String,
    date: { type: Date, default: Date.now }, 
    nr_klasy: {type: String,ref: 'schoolClass'},
    szkola  : {type: String,ref: 'school'},
    details : String
    
});

var students = mongoose.model('students',studentSchema);
studentSchema.plugin(deepPopulate);

module.exports = students;