const auth = require('./authentication');

module.exports = {
    create: function() {
        return auth.getAccessToken()
            .then(data => {
                return new Optimizely(data.accessToken);
            })
            .catch(() => auth.getRefreshToken()
                .then(data => {
                    return new Optimizely(data.accessToken);
                }));
    }
};

class Optimizely {
    constructor(accessToken) {
        this.experiments = require('./experiments')(accessToken);
        this.projects = require('./projects')(accessToken);
    }
}
