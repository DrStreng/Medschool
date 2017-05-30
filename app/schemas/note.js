var mongoose = require('mongoose');

var Scheam = mongoose.Schema;

var noteSchema = new Scheam({
    _id     : { type:String, default : null },
    title   : { type:String, default : null },
    content : { type:Object, default : null },
    student : { type:String, ref:'students' }
});

var note = mongoose.model('note',noteSchema);

module.exports = note;