'use strict';

var request = require('request');
var token = require('./oauthWebApi');
var http = require('http');

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

exports.deleteBookmark = function deleteBookmark(bookmarkId, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/bookmarks/' + bookmarkId,
      headers: {
          'Authorization': 'Bearer ' + access_token
      }
    };
    request.del(options, function (error, response, body) {
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

exports.modifyBookmark = function modifyBookmark(bookmarkId, json, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/api/bookmarks/' + bookmarkId,
        method : 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'text/json'
        }
    };
    var req = http.request(options, function (res) {
        if (res.statusCode == 200) {
            callbackSuccess('修改成功');
        } else {
            var str = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                str += chunk;
            });
            res.on('end', function(){
                console.log(str);
                console.log(res.statusCode);
                var message = JSON.parse(str).message;
                if (message) {
                    callbackError(message);
                } else {
                    callbackError("程序处理错误···")
                } 
            });
        }
    });
    req.on('error', function (e) {
        callbackError(e);
    });
    req.write(json);
    req.end();
  }, function(errordata) {
    callbackError(errordata);
  });
}