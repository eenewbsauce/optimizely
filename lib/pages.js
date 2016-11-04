const R               = require('ramda');
const OptimizelyBase  = require('./optimizelybase');

class Pages extends OptimizelyBase {
    constructor(accessToken) {
        super(accessToken, 'pages');
    }

    get(id) {
        console.log('*****: fetching page');
        return this.request({
           uri: id
        });
    }
}

module.exports = function(accessToken) {
    return new Pages(accessToken);
};
