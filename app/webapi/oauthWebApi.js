/* global Buffer */
'use strict';

var http = require('http');
var encoding = require('encoding');
var qs = require('querystring');
var fs = require('fs');
var user = require('./user');

var __ACCESS_TOKEN;
var __IS_USER_TOKEN = false;

exports.clearToken = function clearToken() {
    __ACCESS_TOKEN = "";
    __IS_USER_TOKEN = false;
}

exports.getToken = function getToken(refush, callbackSuccess, callBackError) {
    if (__ACCESS_TOKEN && !refush) {
        callbackSuccess(__ACCESS_TOKEN);
        return;
    }
    if (user.isHasLogin()) {
        this.getTokenByUser(user.getUserName(), user.getPassword(), callbackSuccess, callBackError);
        return;
    }
    var post_data = {
        grant_type: 'client_credentials'
        };
    var content = qs.stringify(post_data);
    var authKey = fs.readFileSync('./app/authKey.file', 'utf-8');
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Basic ' + authKey
        }
    };
    var req = http.request(options, function (res) {
        var str = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function(){
            try 
            { 
                __ACCESS_TOKEN = JSON.parse(str).access_token;
                callbackSuccess(__ACCESS_TOKEN);
            } catch (e){ callBackError(e); }
        });
    });
    req.on('error', function (e) {
        callBackError(e);
    });
    req.write(content);
    req.end();
}


exports.getTokenByUser = function getTokenByUser(userName, passWord, callbackSuccess, callBackError) {
    if (__ACCESS_TOKEN && __IS_USER_TOKEN) {
        callbackSuccess(__ACCESS_TOKEN);
        return;
    }
    var authKey = fs.readFileSync('./app/authKey.file', 'utf-8');
    var pubkey = fs.readFileSync('./app/publickey.pub', 'utf-8');
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubkey);
    var usernameResult = encrypt.encrypt(userName);
    var passwordResult = encrypt.encrypt(passWord);
    
    var post_data = {
        grant_type: 'password',
        username: usernameResult,
        password: passwordResult
        };
    var content = qs.stringify(post_data);
    var options = {
        hostname: 'api.cnblogs.com',
        port: 80,
        path: '/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Basic ' + authKey
        }
    };
    var req = http.request(options, function (res) {
        var str = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function(){
            try 
            { 
                __ACCESS_TOKEN = JSON.parse(str).access_token;
            } catch (e){ callBackError(e); }
            if (__ACCESS_TOKEN) {
                __IS_USER_TOKEN = true;
                callbackSuccess(__ACCESS_TOKEN);
            } else {
                callBackError("用户名或密码错误，登录失败");
            }
        });
    });
    req.on('error', function (e) {
        callBackError(e);
    });
    req.write(content);
    req.end();
}