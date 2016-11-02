let OptimizelyBase  = require('./optimizelybase');

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
                    project_id: projectId,
                    per_page: 50
                }
            }
        });
    }

    duplicate(experimentObj) {
        console.log('*****: duplicating');
        // console.log(JSON.stringify(experimentObj, null, 4));

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
                variations: [{
                    actions: [
                        {
                            changes: [
                                {
                                    type: "custom_code",
                                    // allow_additional_redirect: true,
                                    async: true,
                                    // css_selector: "a[href*=\"optimizely\"]",
                                    // destination: "https://app.optimizely.com/",
                                    // preserve_parameters: true,
                                    value: "window.someGlobalFunction();"
                                }
                            ],
                            page_id: 7731590774
                        }
                    ],
                    weight: 10000,
                    name: "variation_1"
                }],
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

function fakeVariations() {
    return [
        {
            "actions": [
                {
                    "changes": [
                        {
                            "type": "custom_code",
                            "allow_additional_redirect": true,
                            "async": true,
                            "css_selector": "a[href*=\"optimizely\"]",
                            "destination": "https://app.optimizely.com/",
                            "preserve_parameters": true,
                            "value": "window.someGlobalFunction();"
                        }
                    ],
                    "page_id": 0
                }
            ],
            "archived": true,
            "key": "blue_button_variation",
            "name": "Blue Button",
            "variation_id": 0,
            "weight": 0
        }
    ];
}


module.exports = function(accessToken) {
    return new Campaigns(accessToken);
};
