var utils = require("../util/utils");
var response = require("../util/response");

var userSchema = require('../models/db/schema/user');
var User = require('../models/db/user');

/**
 * add two numbers
 */
exports.addTwoNumber = function(req, res) {
	console.log('addTwoNumber()..');
	// do business logic here
	var sum = utils.addTwoNumber(req.body.numberA, req.body.numberB);
	response.sendSuccessMessageJsonObject(res, null, 'sum', sum);
};

/**
 * add user in db
 */
exports.addUser = function(req, resp) {
	console.log('addUser()..');

	console.log("--------------------------");
	console.log("user request");
	console.log(req.body);
	console.log("--------------------------");

	try {
		var name = req.body.name;
		var address = req.body.address;

		findUser(name,
				function(UserFound) {

					if (UserFound) {
						// user found update it
						console.log("addUser() found existing.");
						UserFound.address = address;
						UserFound.save();
						response.sendSuccessMessage(resp,
								"User updated successfully!");
						return;
					}
					// add new user
					var userNew = new User(name, address);
					// save user in db
					userNew.save(function(err) {
						if (err) {
							response.handleDbError(resp, err);
							return;
						}

						response.sendSuccessMessage(resp, "User Added.");

					});

				});

	} catch (e) {
		console.log("addUser error " + e);
		response.sendServerCommunicationError(resp, e);
	}
};

/**
 * add user in db
 */
exports.findUser = function(req, resp) {
	console.log('findUser()..');

	console.log("--------------------------");
	console.log("findUser request");
	console.log(req.body);
	console.log("--------------------------");

	try {
		var name = req.body.name;

		findUser(name,
				function(User) {

					if (User) {
						// user found update it
						console.log("addUser() found existing.");
						response.sendSuccessMessageJsonObject(resp, null,
								'user', User);
						return;
					}
					// not found
					response.sendErrorMessageJsonObject(resp,
							"User not found!", 'user', null);

				});

	} catch (e) {
		console.log("addUser error " + e);
		response.sendServerCommunicationError(resp, e);
	}
};

/**
 * find user from db
 * 
 * @param room
 */
var findUser = function(name, callBack) {
	console.log("find user by name " + name);
	userSchema.findOne({
		'name' : name
	}, function(err, User) {
		console.log("findUser() User  " + User);
		callBack(User);
	});
};