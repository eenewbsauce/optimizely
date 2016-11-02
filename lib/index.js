const auth = require('./authentication');

module.exports = {
    create: function() {
        return auth.getAccessToken()
                .then(data => {
                    if (data.success) {
                        return new Optimizely(data.accessToken);
                    } else {
                        return auth.getAccessTokenFromRefreshToken()
                            .then(data => {
                                return new Optimizely(data.accessToken);
                            });
                    }
                });
    }
};

class Optimizely {
    constructor(accessToken) {
        this.campaigns = require('./campaigns')(accessToken);
        this.projects = require('./projects')(accessToken);
    }
}
