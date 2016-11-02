let R               = require('ramda');

let OptimizelyBase  = require('./optimizelybase');

class Projects extends OptimizelyBase {
    constructor(accessToken) {
        super(accessToken, 'projects');
    }

    get(projectId) {
        return this.request({
            uri: projectId
        });
    }

    list(filterOptions) {
        console.log('*****: list of projects');
        
        return this.request({})
            .then(response => {
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

module.exports = function(accessToken) {
    return new Projects(accessToken);
}
