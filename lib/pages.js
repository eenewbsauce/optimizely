const R               = require('ramda');
const OptimizelyBase  = require('./optimizelybase');

class Pages extends OptimizelyBase {
    constructor(accessToken) {
        super(accessToken, 'pages');
    }

    get(id, projectId) {
        console.log('*****: fetching page');
        
        return this.request({
            uri: {
                path: id,
                queryParams: {
                    project_id: projectId
                }
            }
        });
    }
}

module.exports = function(accessToken) {
    return new Pages(accessToken);
};
