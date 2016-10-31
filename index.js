let experiments = require('./lib').experiments;

experiments.list()
    .then(response => {
        console.log(JSON.stringify(response, null, 4));
    });
