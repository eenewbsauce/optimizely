const auth = require('./authentication');

module.exports = {
    create: function() {
        return auth.getAccessToken()
            .then(data => {
                return new Optimizely(data.accessToken);
            })
            .catch(() => auth.getAccessTokenFromRefreshToken()
                .then(data => {
                    return new Optimizely(data.accessToken);
                }));
    }
};

class Optimizely {
    constructor(accessToken) {
        this.campaigns = require('./campaigns')(accessToken);
        this.projects = require('./projects')(accessToken);
    }
}
