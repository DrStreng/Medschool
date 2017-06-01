var mongoose = require('mongoose');

var Scheam = mongoose.Schema;

var noteSchema = new Scheam({
    _id     : { type:String, default : null },
    title   : { type:String, default : null },
    content : { type:Object, default : null },
    details : { type:String, default : null },
    dateCreate : { type:Date,   default:Date.now },
    dateEdit : { type:Date,   default:Date.now },
    student : { type:String, ref:'students' }
});

var note = mongoose.model('note',noteSchema);

module.exports = note;