var UserSchema = require('./schema/user');
var User = function(name, address) {
	return new UserSchema({
		name : name,
		address : address,
	});
};

module.exports = User;
