'use strict';

var User = require('./user');
var BookmarksNotLogin = require('./bookmarksNotLogin');
var BookmarksLogin = require('./bookmarksLogin');

exports.showBookmarks = function showBookmarks() {
    $('.content').empty();
    if (User.isHasLogin()) {
        showUserLoginBookmarksView();
    } else {
        showNoUserLoginBookmarksView();
    }
}

function showNoUserLoginBookmarksView() {
    BookmarksNotLogin.showBookmarksNotLogin();
}

function showUserLoginBookmarksView() {
    BookmarksLogin.showBookmarks();
}