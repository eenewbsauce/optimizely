const R = require('ramda');

class UrlHelper {
    constructor() {

    }

    convertDictionaryToQueryParameterString(queryParamObj) {
        let output = '';
        let seperator = '?';

        R.keys(queryParamObj).forEach((key, index) => {
            if (index === 1) {
                seperator = '&';
            }

            output += `${seperator}${key}=${queryParamObj[key]}`;
        });

        return output;
    }
}

module.exports = new UrlHelper();
