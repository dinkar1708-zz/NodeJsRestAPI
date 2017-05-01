var config = require("./config/config");
var utils = require("./util/db");

/**
 * Module dependencies.
 */
// add list of APIs here
var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || config.HTTP_REST_PORT);
// set views directory to display
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// REST APIs path
app.get('/', routes.index);
app.post('/user/addTwoNumber', user.addTwoNumber);
app.post('/user/addUser', user.addUser);
app.post('/user/findUser', user.findUser);

// create server
http.createServer(app).listen(app.get('port'), function() {
	console.log('***Express server listening on port*** ' + app.get('port'));
});

// init mongo db
utils.init();
