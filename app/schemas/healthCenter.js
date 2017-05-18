var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Scheam = mongoose.Schema;

var healthCenterSchema = new Scheam({
    _id     :  { type: String,  default : null},
    name    :  { type: String,  default : null},
    fullName:  { type: String,  default : null},
    address :  { type: String,  default : null},
    isMine  :  { type: Boolean, default : true},
    
});

var healthCenter = mongoose.model('healthCenter',healthCenterSchema);
healthCenterSchema.plugin(deepPopulate);

module.exports = healthCenter;