let request = require('request-promise');
let token   = process.env.OPTIMIZELY_TOKEN;
let baseUri = 'https://www.optimizelyapis.com/experiment/v1';

class Experiments {
    constructor() {
        this.token = token;
        this.baseUri = baseUri;
    }

    list() {
        return request.get({
            uri: `${this.baseUri}/projects/`,
            headers: {
                Token: this.token
            },
            json: true
        });
    }

    create() {

    }

    delete(id) {

    }
}


module.exports = new Experiments();
