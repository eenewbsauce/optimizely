const optlyLib    = require('./lib');
let optly;

optlyLib.create()
    .then(optlyInstance => {
        optly = optlyInstance;
    })
    .then(() => optly.projects.list({ name: 'RocketLoans Dev' }))
    .then(projectId => optly.campaigns.list(projectId))
    .then(campaigns => optly.campaigns.duplicate(campaigns[0]));





    

// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//     auth.accessToken()
//         // .then(() => {
//         //     console.log(JSON.stringify(optlyLib, null, 4));
//         //     projects    = new optlyLib.projects();
//         //     experiments = new optlyLib.experiments();
//         // })
//         // .catch(() => auth.refreshToken())
//         // .then(() => projects.list({ name: 'RocketLoans DEV'}))
//         // .then(projectId => experiments.list(projectId))
//         // .then(response => {
//         //     console.log(JSON.stringify(response, null, 4));
//         // });
// });
//
// app.listen(8080, function () {
//     console.log('Example app listening on port 8080!');
// });
