// server.js
// load the things we need
var express = require('express');
var axios = require('axios');
var app = express();

app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

var serverUrl = "http://localhost:8080";
var serverStatus = "Unknown";

var myVar;
function checkOnServer(){
    console.log("Checking...");

   // Make a request for a user with a given ID
    axios.get(serverUrl, {timeout: 3000})
    .then(function (response) {
    // handle success
         console.log("OK!");
         serverStatus =  "OK!";
    })
    .catch(function (error) {
    // handle error
        console.log("error");
        serverStatus =  "DOWN!";
    })
    .then(function () {
    // always executed
     console.log("executed");
    });
}
myVar = setInterval(checkOnServer, 5000);

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    console.log(req.headers.host);

    res.render('pages/index', {
        serverUrl: serverUrl,
        serverStatus: serverStatus,
    });

});

app.listen(4445);
console.log('4445 is the magic port');