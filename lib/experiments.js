let OptimizelyBase  = require('./optimizelybase');

class Experiments extends OptimizelyBase {
    constructor() {
        super('experiments');
    }
    
    get(id) {
        return this.request({
            uri: id
        });
    }

    list(projectId) {
        return this.request({
            uri: `?project_id=${projectId}`
        });
    }

    create() {

    }

    delete(id) {

    }
}


module.exports = new Experiments();
