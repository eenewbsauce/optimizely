const optlyLib    = require('./lib');
let optly;

optlyLib.create()
    .then(optlyInstance => {optly = optlyInstance})
    .then(() => optly.projects.list({ name: 'RocketLoans Dev' }))
    .then(projectId => optly.campaigns.list(projectId))
    .then(campaigns => optly.campaigns.duplicate(campaigns[0]));
