var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var studentSchema = new Scheam({
    _id     : { type:String,  default : null},
    imie    : { type:String,  default : null},
    nazwisko: { type:String,  default : null},
    data_ur : { type:Date ,   default : null},
    pesel   : { type:String,  default : null},
    sex     : { type:String,  default : null},
    date    : { type: Date,   default: Date.now }, 
    nr_klasy: { type: String, default : null, ref: 'schoolClass'},
    szkola  : { type: String, default : null, ref: 'school'},
    details : { type: String, default : null},
    isStudent : { type:Boolean, default : true },
    hc      : { type: String, default : null, ref: 'healthCenter'},
    contact : [{  type: String, default : null,ref:'contacts'}]
    
});

var students = mongoose.model('students',studentSchema);
studentSchema.plugin(deepPopulate);

module.exports = students;