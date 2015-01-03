var NavBar = function(){

	function _getNavBarElements() {
		return element.all(by.css('.nav.navbar-nav li'));
	}

	function _getUserMenu() {		
		return element.all(by.css('.nav.navbar-nav.navbar-right li')).first();
	}

	function _openUserMenu() {
		var userMenu = _getUserMenu();
		userMenu.element(by.css("a")).click();
	}

	function _logout() {
		_openUserMenu();
		var userMenu = _getUserMenu();
		userMenu.all(by.css(".dropdown-menu li")).last().click();
		// webdriver.sleep(2000);
	}

	return {		
		getNavBarElements: _getNavBarElements,
		logout: _logout
	};
};

var WelcomePage = function() {	
	
	function _getButtons(){
		return element.all(by.css('.col-md-10.col-md-offset-1.ng-scope a'));
	}

	function _clickButton(index) {
		_getButtons().get(index).click();
	}

	return {
		openLoginPage: (function(index){
			return function(){
				_clickButton(index);
			};
		})(0), 
		openRegistrationPage: (function(index){
			return function(){
				_clickButton(index);
			};
		})(1)
	}
};

var RegistrationPage = function(){

	function _registerUser(username, password) {

		var _username = element(by.model("username")),
			_password = element(by.model("password")),
			_passwordCheck = element(by.model("check_password"));

		_username.sendKeys(username);
		_password.sendKeys(password);
		_passwordCheck.sendKeys(password);

		var submitButton = element(by.css(".btn.btn-primary"));
		submitButton.click();	
	}

	return {
		registerUser: _registerUser
	}
};

var LoginPage = function() {

	function _login(_username, _password){
		var username = element(by.model("username"));
		username.sendKeys(_username);

		var password = element(by.model("password"));
		password.sendKeys(_password);

		var submitButton = element(by.css(".btn.btn-primary"));
		submitButton.click();	
	}

	return {
		login: _login
	};
};


module.exports = {
	NavBar: NavBar(),
	LoginPage: LoginPage(),
	RegistrationPage: RegistrationPage(),
	WelcomePage: WelcomePage()
};