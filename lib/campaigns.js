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

        return this.request({
            method: 'POST',
            body: changeName(experimentObj, 'NewName')
        })
            .then(res => {
                console.log(JSON.stringify(res, null, 4));
            })
            .catch(err => {
                console.log(JSON.stringify(err, null, 4));
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
