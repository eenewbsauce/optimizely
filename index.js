let optlyLib    = require('./lib');
let projects    = optlyLib.projects;
let experiments    = optlyLib.experiments;
let request = require('request-promise');

projects.list({ name: 'RocketLoans DEV'})
    .then(projectId => experiments.list(projectId))
    .then(response => {
       console.log(JSON.stringify(response, null, 4));
    });

//request('https://app.optimizely.com/oauth2/authorize?client_id=7738630453&redirect_uri=http://localhost:8080&response_type=token&scopes=all&state=somesecurestate').then()

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
//
// app.listen(8080, function () {
//     console.log('Example app listening on port 8080!');
// });
