var NavBar = function(){

	function _getNavBarElements() {
		return element.all(by.css('.nav.navbar-nav li'));
	}

	function _logIn(_username, _password) {

		_getNavBarElements().first().click();

		var username = element(by.model("username"));
		username.sendKeys(_username);

		var password = element(by.model("password"));
		password.sendKeys(_password);

		var submitButton = element(by.css(".btn.btn-primary"));
		submitButton.click();		
	}

	function _register(_username, _password) {

		_getNavBarElements().get(1).click();

		element(by.model("username")).sendKeys(_username);
		element(by.model("password")).sendKeys(_password);
		element(by.model("check_password")).sendKeys(_password);

		element(by.css(".btn.btn-primary")).click();		
	}

	function _logout() {
		_getNavBarElements().last().click();		
	}

	return {
		logIn: _logIn,
		logout: _logout,
		register: _register,
		getNavBarElements: _getNavBarElements
	};
};


module.exports = {
	NavBar: NavBar()
}