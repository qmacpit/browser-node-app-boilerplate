var User = require("../models/user");
var CryptoJS = require("crypto-js/pbkdf2");

module.exports = {
	createUser: function(user, callback) {

		console.log("creating user..")
		console.log(user)
        User.findOne({ 
        	username: user.username
        },function(err, existingUser) {
        	console.log("1")
            if (err)
               return callback(err);
            
            if (existingUser) {
                callback('User already exist!');
            } else {
                var newUser = new User({ 
                    username: user.username,
                    role: user.role, 
                    password: user.password
                });
                console.log("1")
                newUser.save(function (err, _user) {
                    if (err)
                        callback(err);
                    callback(null, _user);
                });
            }
        });
	},
	createAndHashUser: function(user, callback) {		                               
		user.password = CryptoJS(user.password, user.username, { keySize: 256/32 }).toString();
		this.createUser(user, callback);
	}
}