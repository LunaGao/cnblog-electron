'use strict';

var request = require('request');
var http = require('http');
var qs = require('querystring');
var token = require('./oauthWebApi');

exports.getSearch = function getSearch(category, keyWords, pageIndex, viewTimesAtLeast, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
        url: 'http://api.cnblogs.com/api/ZzkDocuments/' + category + 
            '?keyWords=' + encodeURI(keyWords) + 
            '&pageIndex=' + pageIndex + 
            '&viewTimesAtLeast=' + viewTimesAtLeast,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log("BODY: " + body);
        callbackSuccess(body);
      } else {
        callbackError(error);
      }
    });
  }, function(errordata) {
    callbackError(errordata);
  });
}