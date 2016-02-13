'use strict';

var User = require('../app/build/user');

function login() {
    User.setLogin();
}

function logout() {
    User.setLogout();
}

function loginByView() {
    User.setLoginByView();
}

function alertLoginView() {
    User.showAlertLoginView();
}

function closeLoginView(){
    $(".showAlertLoginView-lunagao").remove();
    $(".showAlertLoginView-lunagao-bg").remove();
}