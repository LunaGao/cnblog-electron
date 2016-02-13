'use strict';

var User = require('./user');
var StatusesNotLogin = require('./statusesNotLogin');
var StatusesLogin = require('./statusesLogin');

exports.showStatuses = function showStatuses() {
    $('.content').empty();
    if (User.isHasLogin()) {
        showUserLoginStatusesView();
    } else {
        showNoUserLoginStatusesView();
    }
}

function showNoUserLoginStatusesView() {
    StatusesNotLogin.showStatusesNotLogin();
}

function showUserLoginStatusesView() {
    StatusesLogin.showStatuses();
}