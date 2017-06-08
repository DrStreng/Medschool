var express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');

var routes = require('./routes');
var healthCenter = require('./routes/healthCenter');
var students = require('./routes/students');
var schools = require('./routes/schools');
var schoolClass = require('./routes/schoolClass');
var note = require('./routes/note');
var contacts = require('./routes/contacts');

var config  = require("./routes/conf");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.use('/students', students);
app.use('/schools', schools);
app.use('/schoolClass', schoolClass);
app.use('/healthCenter', healthCenter);
app.use('/note', note);
app.use('/contacts', contacts);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	// log a message to console!
});

module.exports = app;
