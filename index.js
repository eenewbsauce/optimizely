const request     = require('request-promise');
const optlyLib    = require('./lib');
const auth        = optlyLib.authentication;
let projects;
let experiments;

auth.getAccessToken()
    .then(res => {
        console.log('res from at: ' + JSON.stringify(res, null, 4));
    })
    .catch(() => auth.getRefreshToken()
        .then(res => {
            console.log('res from rt: ' + JSON.stringify(res, null, 4));
        })
    );



    

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
