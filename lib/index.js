const auth = require('./authentication');
let instance;
let isWorking = false;
let resolveBuffer = [];

module.exports = {
    create: function() {
        return new Promise((resolve, reject) => {
            if (isWorking) {
                resolveBuffer.push(resolve);
            } else {
                isWorking = true;
                if (typeof instance !== 'undefined') {
                    resolve(instance);
                } else {
                    auth.getAccessToken()
                        .then(data => {
                            if (data.success) {
                                instance = new Optimizely(data.accessToken);
                                isWorking = false;

                                resolveBuffer.forEach(res => {
                                    res(instance);
                                });

                                resolve(instance);
                            } else {
                                auth.getAccessTokenFromRefreshToken()
                                    .then(data => {
                                        instance = new Optimizely(data.accessToken);
                                        isWorking = false;

                                        resolveBuffer.forEach(res => {
                                            res(instance);
                                        });

                                        resolve(instance);
                                    });
                            }
                        });
                }
            }
        })
            .catch(err => {
                throw new Error(err);
            });
    }
};

class Optimizely {
    constructor(accessToken) {
        this.campaigns = require('./campaigns')(accessToken);
        this.projects = require('./projects')(accessToken);
        this.pages = require('./pages')(accessToken);
    }
}
