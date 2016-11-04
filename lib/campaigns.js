const R               = require('ramda');
const OptimizelyBase  = require('./optimizelybase');


class Campaigns extends OptimizelyBase {
    constructor(accessToken) {
        super(accessToken, 'experiments');
    }
    
    get(id) {
        return this.request({
            uri: id
        });
    }

    list(projectId) {
        console.log('*****: list experiments by projectid');

        return this.request({
            uri: {
                queryParams: {
                    project_id: projectId
                }
            }
        });
    }

    duplicate(experimentObj) {
        console.log('*****: duplicating');
        console.log(JSON.stringify(experimentObj, null, 4).blue);
        
        return this.request({
            method: 'POST',
            uri: {
                queryParams: {
                    publish: false
                }
            },
            body: {
                project_id: experimentObj.project_id,
                name: 'New Experiment',
                change: {
                    type: 'custom_code'
                },
                metrics: [{
                    kind: 'string'
                }],
                variations: copyVariations(experimentObj),
                // variations: [{
                //     actions: [
                //         {
                //             changes: [
                //                 {
                //                     type: "custom_code",
                //                     // allow_additional_redirect: true,
                //                     async: true,
                //                     // css_selector: "a[href*=\"optimizely\"]",
                //                     // destination: "https://app.optimizely.com/",
                //                     // preserve_parameters: true,
                //                     value: "window.someGlobalFunction();"
                //                 }
                //             ],
                //             page_id: 7731590774
                //         }
                //     ],
                //     weight: 10000,
                //     name: "variation_1"
                // }],
                type: 'a/b'
            }
            //body: changeName(experimentObj, 'NewName')
        });
    }

    create(experiment) {

    }

    delete(id) {

    }
}

function changeName(experimentObj, name) {
    experimentObj.name = name;
    experimentObj.variations = fakeVariations();
    delete experimentObj.id;
    delete experimentObj.created;
    delete experimentObj.last_modified;

    return experimentObj;
}

function copyVariations(experimentObj) {
    delete experimentObj.created;

    let tester = R.forEach(variation => {
        delete variation.variation_id;
        delete variation.created;
        delete variation.last_modified;

        R.forEach(action => {
            // delete action.changes;
            R.forEach(change => {
                delete change.allow_additional_redirect;
                delete change.preserve_parameters;
                delete change.id;
            }, action.changes);
        }, variation.actions);
    }, experimentObj.variations);

    console.log(JSON.stringify(tester, null, 4).magenta);

    return tester;
}


module.exports = function(accessToken) {
    return new Campaigns(accessToken);
};
