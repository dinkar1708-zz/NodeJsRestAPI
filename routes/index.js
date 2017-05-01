/*
 * GET home page.
 */

exports.index = function(req, res) {
	console.log("Default page...");
	// open index view
	res.render('index', {
		title : 'Express API demo'
	});
};