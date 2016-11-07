const request       = require('request-promise');
const R             = require('ramda');
const colors        = require('colors');

const baseUri       = 'https://api.optimizely.com/v2';
const urlHelper     = require('../helpers').url;    

class OptimizelyBase {
    constructor(accessToken, derivedUri) {
        this.request = R.curry(curriedRequest)({
            uri: `${baseUri}/${derivedUri}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            json: true
        });
    }
}

function curriedRequest(baseOptions, derivedOptions) {
    if (derivedOptions.uri) {
        derivedOptions.uri = `${baseOptions.uri}${resolveDerivedUri(derivedOptions.uri)}`;
    }

    let mergedOptions = R.merge(baseOptions, derivedOptions);
    let loggedOptions = R.clone(mergedOptions);
    delete loggedOptions.body;

    console.log(JSON.stringify(loggedOptions, null, 4).cyan);

    return request(mergedOptions)
        .then(res => {
            console.log(JSON.stringify(res, null, 4).green);

            return res;
        })
        .catch(err => {
            console.log(JSON.stringify(err, null, 4).red);
        });
}

function resolveDerivedUri(uriObj) {
    let queryParams = uriObj.hasOwnProperty('queryParams')
        ? urlHelper.convertDictionaryToQueryParameterString(uriObj.queryParams)
        : '';

    let path = uriObj.hasOwnProperty('path')
        ? `/${uriObj.path}`
        : '';

    return `${path}${queryParams}`;
}

module.exports = OptimizelyBase;
