var express = require('express');
var request = require('request');
var mysql = require('mysql');
var connection = connectToDatabase('myHost', 'myUser', 'myPassword', 'myDatabase');
var i = 0;
var app = express();
// My microservice!
app.use(express.static('public'));
console.log('Exact name: ' + process.env.ORA_INSTANCE_NAME);
for (var i = 0 ; i < 10; i++){
    runGetRequest(i);
    console.log(i);
}
//runDatabaseQuery();

// Does a GET request to ip.jsontest.com

    function runGetRequest(i) {    
        var url = "http://129.157.179.180:3000/shield/45/"+i+"/blue/frenkzappa";
        request(url, function(error, response, body) {
            if(!error) {
                console.log(body);
            } else {
                console.log(error);
            }
        });
    };


//Executes a SQL query
function runDatabaseQuery() {
    connection.query("SELECT * FROM SampleTable", function(error, rows, fields) {
        if(!error) {
            console.log(rows);
        } else {
            console.log(error);
        }
    });
};

// Returns a connection object to the database.
function connectToDatabase(host, user, password, database) {
    var connectionJson = {
        host: host,
        user: user,
        password: password,
        database: database,
        timezone: 'utc'
    };
    return mysql.createConnection(connectionJson);
};

module.exports = app;
