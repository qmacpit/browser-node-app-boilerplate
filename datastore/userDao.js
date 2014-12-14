var User = require("../models/user");
var CryptoJS = require("crypto-js/pbkdf2");

module.exports = {
	createUser: function(user) {

		return User.findOne({ 
        	username: user.username
        })
        .exec()
        .then(function(existingUser){
			if (existingUser) {
                throw new Error('User already exists');
            } else {
                var newUser = new User({ 
                    username: user.username,
                    role: user.role, 
                    password: user.password
                });
                return newUser.save()
            }
        })        
	},
	createAndHashUser: function(user) {		                               
		user.password = CryptoJS(user.password, user.username, { keySize: 256/32 }).toString();
		return this.createUser(user);
	},
	removeUsers: function(criteria){
		return User.remove(criteria).exec();
	}
}