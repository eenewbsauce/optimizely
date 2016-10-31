let request = require('request-promise');
let R       = require('ramda');

// let token   = process.env.OPTIMIZELY_TOKEN;
let token   = process.env.OPTLY_OAUTH2;

let baseUri = 'https://api.optimizely.com/v2';

class OptimizelyBase {
    constructor(derivedUri) {
        this.request = R.curry(curriedRequest)({
            uri: `${baseUri}/${derivedUri}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true
        });
    }
}

function curriedRequest(baseOptions, derivedOptions) {
    if (derivedOptions.uri) {
        derivedOptions.uri = `${baseOptions.uri}${derivedOptions.uri}`;
    }

    Object.assign(baseOptions, derivedOptions)

    console.log(JSON.stringify(baseOptions, null, 4));

    return request(baseOptions);
}

module.exports = OptimizelyBase;
