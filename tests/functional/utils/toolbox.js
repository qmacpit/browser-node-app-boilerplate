var pbkdf2 = require("crypto-js/pbkdf2");

module.exports = {
	Users: {
		createUser: function(ajaxer, username, password) {
			return ajaxer.post("/signup", {
				username: username,
				password: pbkdf2(password, username, { keySize: 256/32 }).toString()
			})
		},
		getUsers: function(ajaxer) {
			return ajaxer.get("/users");
		},
		removeUsers: function(ajaxer){
			return ajaxer.delete("/users/");
		},
		removeUser: function(ajaxer, id){
			return ajaxer.delete("/user/" + id);
		},
		changePassword: function(ajaxer, username, oldPassword, newPassword1, newPassword2) {
			return ajaxer.post("/changePassword", {
				oldPassword: pbkdf2(oldPassword, username, { keySize: 256/32 }).toString(),
				newPassword1: pbkdf2(newPassword1, username, { keySize: 256/32 }).toString(),
				newPassword2: pbkdf2(newPassword2, username, { keySize: 256/32 }).toString()
			})
		}
	}
}