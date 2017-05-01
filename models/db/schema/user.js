
var mongoose = require('mongoose');

// room number as id
var schema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		unique : true,
		index : true
	},
	address : {
		type : String
	}
});
// mongodb collection and mongoose schema mapping
module.exports = mongoose.model('User', schema);