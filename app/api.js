var UserDao = require("../datastore/userDao");

module.exports = function(){
    
    function _handleRequest(req, res, promise) {
        promise.then(function(data){
           return res.json(data);    
        })
        .onReject(function(err){            
            res.send(500, err);
        });
    };

    return {

        signup: function (req,res)
        {

            var user = req.body;
            if (!user.username || !user.username)
                res.send(500, "user/password cannot be blank");
            user.role = "user";
            UserDao.createUser(user)
            .then(function(_user){
               return res.json(_user);    
            })
            .onReject(function(err){
                console.log(err);
                res.send(500, err.message);
            });
        },        
        login:function(req,res)
        {
            res.json({ 
                auth_token: req.user.token.auth_token,
                role: req.user.role,
                username: req.user.username
            });
        },
        logout: function(req,res)
        {
            req.user.auth_token = null;
            req.user.save(function(err,user){
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ message: 'See you!'});
            });
        },
        changePassword: function(req, res) {
            var data = req.body;
            if (data.oldPassword !== req.user.password)
                return res.send(500, "old password doesn't match");

            if (data.newPassword1 !== data.newPassword2)
                return res.send(500, "new password doesn't match");

            req.user.password = data.newPassword1;            
            _handleRequest(req, res, UserDao.update(req.user));
        },
        getUsers: function(req, res){
            return _handleRequest(req, res, UserDao.getUsers({
                role: "user"
            }));
        },
        createPerson: function(req,res)
        {
            var person = req.body.person;

            if (typeof person.name != "string") {
                res.send(400, {'message': "Name must be a string!"});
            }
            if (typeof person.age != "number") {
                res.send(400, {'message': "Age must be a number!"});
            }

            var newPerson = new Person({ name: person.name, age: person.age})
            newPerson.save(function (err, user) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Person was successfully added!'});
            });

        },
        updatePerson: function(req,res)
        {
            var _id = req.params.id;
            var person = req.body.person;

            var query = { _id: _id };
            Person.update(query, {name:person.name,age:person.age}, null, function (err, thing) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Person was successfully updated!'});
            })

        },
        removePerson: function(req,res)
        {
            var _id = req.params.id;

            Person.remove({ _id:_id}, function (err, user) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Person was successfully removed!'});
            })


        },
        getPeople: function(req,res)
        {

            // Person.find(function(err,people){
                // res.json({people: people });
                res.json({});
            // })


        },
        createThing: function(req,res)
        {

            console.log(req.body);
            var thing = req.body.thing;

            if (typeof thing.name != "string") {
                res.send(400, {'message': "Name must be a string!"});
            }
            if (typeof thing.size != "number") {
                res.send(400, {'message': "Size must be a number!"});
            }

            var newThing = new Thing({ name: thing.name, size: thing.size})
            newThing.save(function (err, thing) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Thing was successfully created!'});
            });

        },
        updateThing: function(req,res)
        {
            var _id = req.params.id;
            console.log(req.body);
            console.log(_id);

            var thing = req.body.thing;

            var query = { _id: _id };
            Thing.update(query, {name:thing.name,size:thing.size}, null, function (err, thing) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Thing was successfully updated!'});
            })

        },
        removeThing: function(req,res)
        {
            var _id = req.params.id;

            Thing.remove({ _id:_id}, function (err, user) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Thing was successfully removed!'});
            })

        },
        getThings: function(req,res)
        {
            // Thing.find(function(err,things){
            //     res.json({things: things });
            // });
            res.json({});
        },
        removeUsers: function(req,res)
        {
            var id = req.params.id,
                criteria = {
                    role: "user"
                };

            if (id)
                criteria._id = id;

            UserDao.removeUsers(criteria)
            .then(function(){
                res.send(200);
            })
            .onReject(function(err){
                res.send(500, err);
            })

        },


    }

}



