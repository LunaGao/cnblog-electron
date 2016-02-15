'use strict';

var BookmarksWebApi = require('./bookmarksWebApi');
var ErrorCB = require('./errorCB');
var user = require('./user');

var _pageIndexForBookmarks = 1;

exports.showBookmarks = function showBookmarks() {
    _pageIndexForBookmarks = 1;
    // $('.statuses-result-list-login-lunagao').html('<img class="loading" src="./images/icons/svg/pencils.svg"/>');
    BookmarksWebApi.getBookmarks(1, 20, bookmarksSuccessCallBack, ErrorCB.showError);
}

function bookmarksSuccessCallBack(body) {
    console.log(body);
}