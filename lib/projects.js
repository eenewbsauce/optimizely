let R               = require('ramda');

let OptimizelyBase  = require('./optimizelybase');

class Projects extends OptimizelyBase {
    constructor() {
        console.log('*****: hit projects constructor');
        super('projects');
    }

    get(projectId) {
        return this.request({
            uri: projectId
        });
    }

    list(filterOptions) {
        console.log('*****: projects list');
        return this.request({})
            .then(response => {
                console.log(JSON.stringify(response, null, 4));
                if (typeof filterOptions === 'undefined') {
                    return response;
                } else if (filterOptions.name) {
                    return R.find(project => {
                        return project.name.toLowerCase() === filterOptions.name.toLowerCase();
                    }, response).id;
                }
            });
    }
}

module.exports = Projects;
