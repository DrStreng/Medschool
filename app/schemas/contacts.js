var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var contactsSchema = new Scheam({
    _id     : { type:String,   default : null},
    person  : { type:String,   default : null},
    num     : { type:String,   default : null},
    show    : { type:Boolean,  default : null},
});

var contacts = mongoose.model('contacts',contactsSchema);
contactsSchema.plugin(deepPopulate);

module.exports = contacts;