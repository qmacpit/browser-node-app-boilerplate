var pbkdf2 = require("crypto-js/pbkdf2");

module.exports = {
	Users: {
		createUser: function(ajaxer, username, password) {
			return ajaxer.post("/signup", {
				username: username,
				password: pbkdf2(password, username, { keySize: 256/32 }).toString()
			})
		},
		removeUsers: function(ajaxer){
			return ajaxer.delete("/users");
		}
	}
}