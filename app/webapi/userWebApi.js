'use strict';

var request = require('request');
var http = require('http');
var qs = require('querystring');
var token = require('./oauthWebApi');

exports.getUserInfo = function(username, password, callbackSuccess, callbackError) {
    token.getTokenByUser(username, password, function(access_token) {
        var options = {
            url: 'http://api.cnblogs.com/api/Users',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        };
        request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callbackSuccess(body);
        } else {
            callbackError(error);
        }
        });
    }, function(errordata) {
        callbackError(errordata);
    });
}
