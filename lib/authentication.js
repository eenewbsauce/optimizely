const request       = require('request');
const querystring   = require('querystring');
const eventEmitter  = require('events');
const redis         = require('redis');
const client        = redis.createClient();

const authCode  = process.env.OPTLY_AUTH_CODE;
const secret    = process.env.OPTLY_SECRET;
const urlHelper = require('../helpers').url;
const baseUri   = 'https://app.optimizely.com/oauth2/token';

class Authentication {
    constructor() {
    }
    
    getAccessToken() {
        let qpObj = {
            code: authCode,
            client_id: 7738630453,
            client_secret: secret,
            redirect_uri: 'http%3A%2F%2Flocalhost%3A8080',
            grant_type: 'authorization_code'
        };

        const qp = urlHelper.convertDictionaryToQueryParameterString(qpObj);

        return new Promise((resolve, reject) => {
            if (this.accessToken) {
                resolve({accessToken: this.accessToken});
            }

            request({
                uri: `${baseUri}${qp}`,
                method: 'POST',
                json: true
            }, (err, res, body) => {
                if (err || !body.succeeded) {
                    reject(new Error('Error getting access token'));
                } else {
                    client.set('access-token', body.access_token, redis.print);
                    client.set('refresh-token', body.refresh_token, redis.print);

                    this.accessToken = body.access_token;
                    this.refreshToken = body.refresh_token;

                    resolve({
                        accessToken: this.accessToken
                    });
                }
            });
        });
    }

    getRefreshToken() {
        return new Promise((resolve, reject) => {
            if (typeof this.refreshToken === 'undefined') {
                client.get('refresh-token', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        getAccessTokenFromRefreshToken(data)
                            .then(resolve)
                            .catch(reject);
                    }
                });
            } else {
                getAccessTokenFromRefreshToken(this.refreshToken)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }
}

function getAccessTokenFromRefreshToken(refreshToken) {
    let qpObj = {
        refresh_token: refreshToken,
        client_id: 7738630453,
        client_secret: secret,
        grant_type: 'refresh_token'
    };

    const qp = urlHelper.convertDictionaryToQueryParameterString(qpObj);

    return new Promise((resolve, reject) => {
        request({
            uri: `${baseUri}${qp}`,
            method: 'POST',
            json: true
        }, (err, res, body) => {
            if (res.statusCode !== 200) {
                reject(body);
            } else {
                this.accessToken = body.access_token;
                client.set('access-token', this.accessToken, redis.print);

                resolve({
                    accessToken: this.accessToken
                });
            }
        });
    });

}

module.exports = new Authentication();
