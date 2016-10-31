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
        derivedOptions.uri = `${baseOptions.uri}${resolveDerivedUri(derivedOptions.uri)}`;
    }

    Object.assign(baseOptions, derivedOptions);

    console.log(JSON.stringify(baseOptions, null, 4));

    return request(baseOptions);
}

function resolveDerivedUri(uriObj) {
    let queryParams = uriObj.hasOwnProperty('queryParams')
        ? convertQueryParameterDictionaryToString(uriObj.queryParams)
        : '';

    let path = uriObj.hasOwnProperty('path')
        ? pathArr
        : '';

    return `${path}${queryParams}`;
}


function convertQueryParameterDictionaryToString(queryParams) {
    let output = '';
    let seperator = '?';

    R.keys(queryParams).forEach((key, index) => {
        if (index === 1) {
            seperator = '&';
        }

        output += `${seperator}${key}=${queryParams[key]}`;
    });

    return output;
}

module.exports = OptimizelyBase;
