var mongoose = require('mongoose');
var config = require("../config/config");
module.exports = {
	init : function() {
		initialize();
	}
};

var initialize = function() {

	const
	MONGO_URL = 'mongodb://' + config.HOST_IP + '/REST_DEMO';

	mongoose.connect(MONGO_URL, {
		server : {
			// always keep trying to connect
			reconnectTries : Number.MAX_VALUE
		}
	});

	mongoose.connection.on('connected', function() {
		console.log('\nMongoose on(connected) default connection open to '
				+ MONGO_URL);
	});

	mongoose.connection.on('error', function(e) {
		console.log('\nMongoose on(error) connection error: ' + e);
	});

	// mongoose internally always do retrying if connection is disconnected.
	mongoose.connection.db.on('reconnect', function(ref) {
		console.log('Mongoose on(reconnect) reconnected to mongo server.');
	});

	mongoose.connection.on('disconnected', function() {
		console.log('\nMongoose on(disconnected) disconnected.');
	});

	module.exports = mongoose;
};