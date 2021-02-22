
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var hello = require('./routes/hello');
var project = require("./routes/project")
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/hello/:userName', hello.view);
app.get("/project",project.viewProject);
app.get("/project/:name",project.viewProject);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'GuAepYXLNNbNLLd8w2UMknXsgzPzxxhqHDCSPPHL', // This is your Application ID
  '3QWSLUqIYVofYW9f4nHCMcql0BmFy0TuR16UMuyY', // This is your Javascript key
  'OOrHFH3EsyD5CxgfCyhdGTS5Najxfiei6t9z71yi' // This is your Master key (never use it in the frontend)
);