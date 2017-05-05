var mongoose = require('mongoose');
var tools = require('./funct/tools');
var config   = {};
var express = require('express'),
    app = express();

var login   = ""
var pass    = ""
var address = "localhost:27017"

config.mongoURI = {
    development: 'mongodb://'+login+':'+pass+'@'+address+'/supApp',
    test: 'mongodb://'+address+'/supApp',
}

mongoose.connect(config.mongoURI[app.settings.env],function(err){
    if(err){
        console.log("Blad polaczenia z BD" + err);
    } else {
        console.log("Połączono z BD: "+ config.mongoURI[app.settings.env]);
        console.log('aaaaaaaaaa');
        tools.init();
    }
});