const R                 = require('ramda');
const OptimizelyBase    = require('./optimizelybase');
let pages;

require('./').create()
    .then(instance => {
        pages = instance.pages;
    });

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

        return pages.get(experimentObj.variations[2].actions[0].page_id)
            .then(() => this.request({
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
                    type: 'a/b'
                }
             })
        );
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
            delete action.changes;
            // R.forEach(change => {
            //     delete change.allow_additional_redirect;
            //     delete change.preserve_parameters;
            //     delete change.id;
            // }, action.changes);
        }, variation.actions);
    }, experimentObj.variations);

    console.log(JSON.stringify(tester, null, 4).magenta);

    return tester;
}


module.exports = function(accessToken) {
    return new Campaigns(accessToken);
};
