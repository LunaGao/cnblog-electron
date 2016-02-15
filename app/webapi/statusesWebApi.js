'use strict';

var request = require('request');
var http = require('http');
var qs = require('querystring');
var token = require('./oauthWebApi');

exports.getStatusesByType = function getStatusesByType(type, pageIndex, pageSize, tag, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/statuses/@' + type + "?pageIndex=" + pageIndex + '&pageSize=' + pageSize + '&tag=' + tag,
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

exports.getStatusesComments = function getStatusesComments(statusId, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/statuses/' + statusId + "/comments",
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

exports.publishStatuses = function publishStatuses(comment, isPrivate, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var commentValue = '{"Content":"' + comment + '", "IsPrivate":' + isPrivate + '}'
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/api/statuses',
        method : 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'text/json'
        }
    };
    var req = http.request(options, function (res) {
        if (res.statusCode == 200) {
            callbackSuccess('发布成功');
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
    req.write(commentValue);
    req.end();
  }, function(errordata) {
    callbackError(errordata);
  });
}

exports.deleteStatuses = function deleteStatuses(statusId, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/statuses/' + statusId,
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

exports.deleteStatusesComment = function deleteStatusesComment(statusId, commentId, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/statuses/' + statusId + '/comments/' + commentId,
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

exports.replyStatuses = function replyStatuses(statusId, replyTo, parentCommentId, content, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var commentValue = '{"ReplyTo":' + replyTo + ', "ParentCommentId":' + parentCommentId + ',"Content":"' + content + '"}'
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/api/statuses/' + statusId + '/comments',
        method : 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'text/json'
        }
    };
    var req = http.request(options, function (res) {
        if (res.statusCode == 200) {
            callbackSuccess('回复成功');
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
    req.write(commentValue);
    req.end();
  }, function(errordata) {
    callbackError(errordata);
  });
}