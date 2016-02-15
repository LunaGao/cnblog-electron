'use strict';

var request = require('request');
var token = require('./oauthWebApi');

exports.getBookmarks = function getBookmarks(pageIndex, pageSize, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
        url: 'http://api.cnblogs.com/api/Bookmarks?pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        headers: { 'Authorization': 'Bearer ' + access_token }
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