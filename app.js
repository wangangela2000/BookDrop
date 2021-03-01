
/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars')

var index = require('./routes/index');
var add_listing = require('./routes/add_listing');
var filters = require("./routes/filters")
var inventory = require("./routes/inventory")
var listing = require("./routes/listing")
var menu = require("./routes/menu")
var register = require("./routes/register")
var results = require("./routes/results")
var search_listing = require("./routes/search_listing")
var setting = require("./routes/setting")
var signin = require("./routes/signin")
var help = require("./routes/help")




// Example route
// var user = require('./routes/user');

const app = express();

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

app.use(express.urlencoded({
  extended: true
}))

// Add routes here
app.get('/', index.view);
app.get('/add_listing', add_listing.view);
app.get('/filters', filters.view);
app.get('/help', help.view);
app.get('/inventory', inventory.view);
app.get('/listing/:id', listing.view);
app.get('/menu', menu.view);
app.get('/register', register.view);
app.get('/results', results.view);
app.get('/search_listing', search_listing.view);

app.get('/setting', setting.view);
app.post('/setting', search_listing.view);


app.get('/signin', signin.view);

app.get('/inventory/delete/:id', inventory.delete);


app.post('/inventory/add', inventory.add);
// app.get('/inventory/add', inventory.view);

//app.get('/hello/:userName', hello.view);
//app.get("/project",project.viewProject);
//app.get("/project/:name",project.viewProject);
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
