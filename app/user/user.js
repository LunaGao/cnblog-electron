'use strict';

var LocalStorage = require('node-localstorage').LocalStorage;
var UserWebApi = require('./userWebApi');
var blogWebApi = require('./blogsWebApi');
var token = require('./oauthWebApi');
var UserBlogs = require('./UserBlogs');
var ErrorCB = require('./errorCB');
var fs = require('fs');

exports.showUserInfo = function showUserInfo() {
    localStorage = new LocalStorage('./localStorage');
    if (this.isHasLogin()) {
        showUserInfoView();
        showUserBlogsInformation();
    } else {
        showLoginView();
    }
}

exports.isHasLogin = function isHasLogin() {
    if (localStorage.getItem('UserId') != null) {
        return true;
    } else {
        return false;
    }
}

exports.getUserName = function getUserName() {
    return localStorage.getItem('username');
}

exports.getPassword = function getPassword() {
    return localStorage.getItem('password');
}

exports.getUserId = function getUserId() {
    return localStorage.getItem('UserId');
}

exports.setLogin = function setLogin() {
    var username = $('#login-name').val();
    var password = $('#login-pass').val();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    if (username.length == 0) {
        alert('用户名不可为空');
        return;
    }
    if (password.length == 0) {
        alert('密码不可为空');
        return;
    }
    UserWebApi.getUserInfo(username, password, function(body) {
        saveLoginInformation(username, password, body);
        showUserInfoView();
        showUserBlogsInformation();
        }, ErrorCB.showError
    );
}

exports.setLoginByView = function setLoginByView() {
    var username = $('#login-name').val();
    var password = $('#login-pass').val();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    if (username.length == 0) {
        alert('用户名不可为空');
        return;
    }
    if (password.length == 0) {
        alert('密码不可为空');
        return;
    }
    UserWebApi.getUserInfo(username, password, function(body) {
            saveLoginInformation(username, password, body);
            $(".showAlertLoginView-lunagao").remove();
            $(".showAlertLoginView-lunagao-bg").remove();
            // todo 登录了
            $(".comment-need-login").parent().remove();
            var commentHtml;
            commentHtml = '<div class="commentLeaveMessage blogComment"><div class="Author"><h6>' + localStorage.getItem('DisplayName') + '</h6></div>';
            commentHtml += '<textarea class="blogCommentBody" />';
            commentHtml += '<div class="comment-need-login"><a href="#" class="btn btn-block btn-lg btn-primary">回复</a></div>';
            commentHtml += '</div>';
            $(".blogComments").append(commentHtml);
        }, ErrorCB.showError
    );
}

exports.setLogout = function setLogout() {
    if (window.confirm("确认吗?")) {
        token.clearToken();
        localStorage.removeItem('UserId');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('SpaceUserId');
        localStorage.removeItem('BlogId');
        localStorage.removeItem('DisplayName');
        localStorage.removeItem('Face');
        localStorage.removeItem('Avatar');
        localStorage.removeItem('Seniority');
        localStorage.removeItem('BlogApp');
        localStorage.removeItem('syncTime');
        showLoginView();
    } else {
        // 不处理取消
    }
}

function showLoginView() {
    $('.content').html(getLoginViewHtml(false));
}

function showUserBlogsInformation() {
    blogWebApi.getBlogInformation(localStorage.getItem('BlogApp'),function(body) {
            var json = JSON.parse(body);
            $(".blog-count-lunagao").text("博客：" + json.postCount);
            $(".user-subtitle-lunagao").text(json.subtitle);
        }, ErrorCB.showError);
    UserBlogs.showBlogs();
}

function showUserInfoView() {
    $('.content').html('<div>' + 
        '<div class="userNameLine-lunagao palette-clouds"><img src=' + localStorage.getItem('Avatar') + ' class="img-rounded" /><div class="userName-lunagao"><h3>'+ localStorage.getItem('DisplayName') + '</h3><small class="user-subtitle-lunagao">···</small></div><div class="userExit-lunagao"><a class="btn btn-danger" href="#" onclick="logout();">退出登录</a></div></div>' + 
        '<div class="userInformation-lunagao palette-clouds"><small>园龄：' + localStorage.getItem('Seniority') + '</small><small class="blog-count-lunagao">博客：···</small></div>' + 
        '</div>' + 
        '<div id="list-cnblogs-lunagao"></div><div id="container"></div>');
}

exports.showAlertLoginView = function showAlertLoginView() {
    var alertHtml = '<div class="showAlertLoginView-lunagao-bg"></div>';
    alertHtml += '<div class="showAlertLoginView-lunagao">';
    alertHtml += getLoginViewHtml(true);
    alertHtml += '</div>';
    $("body").append(alertHtml);
}

function loginError(errorData) {
    alert(errorData);
}

function getLoginViewHtml(isView) {
    var accountstr = fs.readFileSync('./app/debugAccount.file', 'utf-8');
    var accountJson = JSON.parse(accountstr);
    var htmlstr = '<div class="login-screen"><div class="login-form"><div class="form-group"><input type="text" class="form-control login-field" value="';
    htmlstr += accountJson.username;
    htmlstr += '" placeholder="登录用户名" id="login-name"><label class="login-field-icon fui-user" for="login-name"></label></div><div class="form-group"><input type="password" class="form-control login-field" value="';
    htmlstr += accountJson.password;
    htmlstr += '" placeholder="密码" id="login-pass"><label class="login-field-icon fui-lock" for="login-pass"></label></div><a class="btn btn-primary btn-lg btn-block" href="#" onclick="';
    if (isView) {
        htmlstr += 'loginByView();'
    } else {
        htmlstr += 'login();'
    }
    htmlstr += '">登录</a><br><small>如果您 "忘记密码" 或 "没有账号"，请访问www.cnblogs.com进行操作。</small></div></div>'
    return htmlstr;
}

function saveLoginInformation(username, password, body) {
    var json = JSON.parse(body);
    localStorage.setItem('UserId', json.UserId);
    localStorage.setItem('SpaceUserId', json.SpaceUserId);
    localStorage.setItem('BlogId', json.BlogId);
    localStorage.setItem('DisplayName', json.DisplayName);
    localStorage.setItem('Face', json.Face);
    localStorage.setItem('Avatar', json.Avatar);
    localStorage.setItem('Seniority', json.Seniority);
    localStorage.setItem('BlogApp', json.BlogApp);
    localStorage.setItem('syncTime', Date.now().toString());
}