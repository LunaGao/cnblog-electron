'use strict';

var request = require('request');
var http = require('http');
var qs = require('querystring');
var token = require('./oauthWebApi');

exports.getBlogs = function getBlogs(pageIndexValue, pageSizeValue, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var data = {
      pageIndex: pageIndexValue,
      pageSize: pageSizeValue};
    var content = qs.stringify(data);
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/api/blogposts/@sitehome?' + content,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + access_token
          }
    };

    var req = http.request(options, function (res) {
      var str = '';
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        str += chunk;
      });
      res.on('end', function(){
        // console.log('JSON: ' + str);
        callbackSuccess(JSON.parse(str));
      });
    });

    req.on('error', function (e) {
        callbackError(e.message);
    });

    req.end();
  }, function(errordata) {
    callbackError(errordata);
  });
}

exports.getBlogBody = function getBlogBody(blogId, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/blogposts/' + blogId + "/body",
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = body.substring(1,body.length-1);
        body = body.replace(/\\r/g, "\r");
        body = body.replace(/\\t/g, "\t");
        body = body.replace(/\\n/g, "\n");
        body = body.replace(/\\"/g, "\"");
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

exports.getBlogComments = function getBlogComments(blogApp, blogId, pageIndexValue, pageSizeValue, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var data = {
      pageIndex: pageIndexValue,
      pageSize: pageSizeValue};
    var content = qs.stringify(data);
    var options = {
      url: 'http://api.cnblogs.com/api/blogs/' + blogApp + '/posts/' + blogId + '/comments?' + content,
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

exports.setBlogComment = function setBlogComment(blogApp, blogId, commentValue, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/api/blogs/' + blogApp + '/posts/' + blogId + '/comments',
        method : 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'text/plain'
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
        callBackError(e);
    });
    req.write(commentValue);
    req.end();
  }, function(errordata) {
    callbackError(errordata);
  });
}

exports.getBlogInformation = function getBlogInformation(blogApp, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
        url: 'http://api.cnblogs.com/api/blogs/' + blogApp,
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

exports.getBlogsByBlogApp = function getBlogsByBlogApp(blogApp, pageIndex, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
        url: 'http://api.cnblogs.com/api/blogs/' + blogApp + '/posts?pageIndex=' + pageIndex,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log("BODY: " + body);
        callbackSuccess(JSON.parse(body));
      } else {
        callbackError(error);
      }
    });
  }, function(errordata) {
    callbackError(errordata);
  });
}