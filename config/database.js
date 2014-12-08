var mongoose = require("mongoose");

module.exports = function(callback) {

    var dbURI = 'mongodb://localhost:27017/myApp';
    // var dbURI = 'mongodb://qmacpit:shopen1!@widmore.mongohq.com:10010/xxx';
    // var connection = mongoose.createConnection(dbURI,{ server: { poolSize: 5 } });
    mongoose.connect(dbURI);
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open to ' + dbURI);
        if (callback)
            callback()

    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}
