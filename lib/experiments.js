let OptimizelyBase  = require('./optimizelybase');

class Experiments extends OptimizelyBase {
    constructor(accessToken) {
        super(accessToken, 'experiments');
    }
    
    get(id) {
        return this.request({
            uri: id
        });
    }

    list(projectId) {
        return this.request({
            uri: {
                queryParams: {
                    project_id: projectId,
                    per_page: 50
                }
            }
        });
    }

    create() {

    }

    delete(id) {

    }
}


module.exports = function(accessToken) {
    return new Experiments(accessToken);
};
