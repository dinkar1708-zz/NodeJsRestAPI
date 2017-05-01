/**
 * send response to client
 */
var sendResponse = function(resp, desc) {
	if (resp.headersSent) {
		console.log("sendResponse()  header already send! ");
		return;
	}
	resp.send(desc);
};

/**
 * to be used for creating success message
 */
var successMsg = function(desc) {
	var msg = {};
	msg.isSuccess = true;
	msg.description = desc;
	return JSON.stringify(msg);
};

/**
 * create json object with given key for success message
 */
var successMsgJsonObj = function(desc, jsonKey, jsonObject, opts) {

	var object = {}; // empty Object
	var key = jsonKey;
	object[key] = [];
	object.isSuccess = opts["isSuccess"];
	object.description = desc;
	// put json object
	object[key] = jsonObject;

	var str = JSON.stringify(object);
	console.log("successMsgJsonObj()  json: " + str);
	return JSON.stringify(object);

};

/**
 * to be used for creating success message with json value created via key value
 * pair
 */
var successMsgJsonArray = function(desc, jsonKey, jsonArray) {

	var object = {}; // empty Object
	var key = jsonKey;
	object[key] = [];
	object.isSuccess = true;
	object.description = desc;
	// iterate and push for array values, for now this is object
	for ( var i in jsonArray) {
		object[key].push(jsonArray[i]);
	}

	var str = JSON.stringify(object);
	console.log("successMsgJson()  json: " + str);
	return JSON.stringify(object);
};

/**
 * to be used for creating message/error message
 */
var infoMsg = function(desc) {
	var msg = {};
	msg.isSuccess = false;
	msg.description = desc;
	return JSON.stringify(msg);
};

// functions can be used in controllers
module.exports = {
	// send response with given desc
	sendResp : function(resp, desc) {
		sendResponse(resp, desc);
	},
	// use to send message/error/info
	sendMessage : function(resp, message) {
		var msg = infoMsg(message);
		console.log("sendMessage() " + msg);
		sendResponse(resp, msg);
	},
	// use to send success message
	sendSuccessMessage : function(resp, desc) {
		var msg = successMsg(desc);
		console.log("sendSuccessMessage() " + msg);
		sendResponse(resp, msg);
	},
	// use to send success message
	sendSuccessMessageJsonObject : function(resp, desc, jsonKey, jsonValue) {
		var msg = successMsgJsonObj(desc, jsonKey, jsonValue, {
			"isSuccess" : true
		});
		console.log("successMsgJsonObj() jsonKey " + jsonKey);
		sendResponse(resp, msg);
	},
	// use to send success message
	sendErrorMessageJsonObject : function(resp, desc, jsonKey, jsonValue) {
		var msg = successMsgJsonObj(desc, jsonKey, jsonValue, {
			"isSuccess" : false
		});
		console.log("successMsgJsonObj() jsonKey " + jsonKey);
		sendResponse(resp, msg);
	},
	// use to send success message
	sendSuccessMessageJsonArray : function(resp, desc, jsonKey, jsonArray) {
		var msg = successMsgJsonArray(desc, jsonKey, jsonArray);
		console.log("sendSuccessMessage()  jsonKey " + jsonKey);
		sendResponse(resp, msg);
	},
	// use to send success message
	sendServerCommunicationError : function(resp, error) {
		var msg = infoMsg("Error occurred while communicating with server!");
		console.log("sendServerCommunicationError " + error);
		sendResponse(resp, msg);
	},
	// handled data base error
	handleDbError : function(resp, error) {
		var msg = infoMsg("Data base error!");
		console.log("handleDbError() " + error);
		sendResponse(resp, msg);
	}
};
