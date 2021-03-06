'use strict';

var request = require('request');
var http = require('http');
var qs = require('querystring');
var token = require('./oauthWebApi');

exports.getKbArticles = function getKbArticles(pageIndexValue, pageSizeValue, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var data = {
      pageIndex: pageIndexValue,
      pageSize: pageSizeValue};
    var content = qs.stringify(data);
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/api/KbArticles?' + content,
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
        callbackError(e);
    });

    req.end();
  }, function(errordata) {
    callbackError(errordata);
  });
}

exports.getKbArticleBody = function getKbArticleBody(kbArticleId, callbackSuccess, callbackError) {
  token.getToken(false, function(access_token) {
    var options = {
      url: 'http://api.cnblogs.com/api/kbarticles/' + kbArticleId + "/body",
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
