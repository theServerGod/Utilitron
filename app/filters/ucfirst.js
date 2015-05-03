/**
 * ucfirst - Capitalise the first letter of a given string
 *
 * @author Jake Skoric <the.server.god@gmail.com>
 */
 app.filter('ucfirst', function() {
 	return function(value) {
 		return (value) ? value.charAt(0).toUpperCase() + value.substr(1) : '';
 	};
 });