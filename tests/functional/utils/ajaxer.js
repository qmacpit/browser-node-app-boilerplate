var assert = require("assert"),
    expect = require('expect.js'),
    Q = require("q"),
    pbkdf2 = require("crypto-js/pbkdf2"),
    RestClient = require('node-rest-client').Client;

var Ajaxer = function(baseUrl){

    var _baseUrl = baseUrl, _client = new RestClient(),
        _auth_token;

    function _processResponse(deferred) {
        return function(data, response){
            switch (response.statusCode) {
                case 200:
                case 201:
                case 204:
                    var json;
                    try {
                        json = JSON.parse(data);
                    } catch (e) {
                        json = data
                    }
                    return deferred.resolve(json, response);
                default:
                    deferred.reject(new Error(data));
            }
        };
    }

    this.login = function(username, password) {
        var deferred = Q.defer();
        _client.post(_baseUrl + "/login", {
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            data: {
                username: username,
                password: pbkdf2(password, username, { keySize: 256/32 }).toString()
            }
        }, function(data, response){
            if (response.statusCode != 200) {
                return deferred.reject("user authentication failed");
            }
            data = JSON.parse(data)
            _auth_token = data.auth_token;            
            deferred.resolve();
        });
        return deferred.promise;
    };

    this.logout = function(){
        var deferred = Q.defer();
        _client.get(_baseUrl + "/logout", {
            headers: {
                'Authorization': "Bearer " + _auth_token
            }
        },_processResponse(deferred));
        _auth_token = "";
        return deferred.promise;
    };

    this.get = function(url) {
        var deferred = Q.defer();
        _client.get(_baseUrl + url, {
            headers: {
                'Authorization': "Bearer " + _auth_token
            }
        },_processResponse(deferred));
        return deferred.promise;
    }

    this.delete = function(url) {
        var deferred = Q.defer();
        _client.delete(_baseUrl + url, {
            headers: {
                'Authorization': "Bearer " + _auth_token
            }
        },_processResponse(deferred));
        return deferred.promise;
    }

    this.post = function(url, data) {
        var deferred = Q.defer();
        _client.post(_baseUrl + url, {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': "Bearer " + _auth_token
            }
        }, _processResponse(deferred));
        return deferred.promise;
    }
};

module.exports = Ajaxer;


