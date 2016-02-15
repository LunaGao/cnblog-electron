'use strict';

exports.showBookmarksNotLogin = function showBookmarksNotLogin() {
    showLoginButton();
}

function showLoginButton() {
    $('.content').html(
        '<div style="text-align: center; margin-top: 100px;">' + 
        '<a class="btn btn-lg btn-primary" onclick="$(\'#user\').click()">登录后才有内容哦~</a>' + 
        '</div>'
        );
}