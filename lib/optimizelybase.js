const request       = require('request-promise');
const R             = require('ramda');

const baseUri       = 'https://api.optimizely.com/v2';
const urlHelper     = require('../helpers').url;    

class OptimizelyBase {
    constructor(accessToken, derivedUri) {
        this.request = R.curry(curriedRequest)({
            uri: `${baseUri}/${derivedUri}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            json: true
        });
    }
}

function curriedRequest(baseOptions, derivedOptions) {
    if (derivedOptions.uri) {
        derivedOptions.uri = `${baseOptions.uri}${resolveDerivedUri(derivedOptions.uri)}`;
    }

    Object.assign(baseOptions, derivedOptions);

    console.log(JSON.stringify(baseOptions, null, 4));

    return request(baseOptions);
}

function resolveDerivedUri(uriObj) {
    let queryParams = uriObj.hasOwnProperty('queryParams')
        ? urlHelper.convertDictionaryToQueryParameterString(uriObj.queryParams)
        : '';

    let path = uriObj.hasOwnProperty('path')
        ? path
        : '';

    return `${path}${queryParams}`;
}

module.exports = OptimizelyBase;
