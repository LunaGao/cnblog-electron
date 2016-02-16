'use strict';

const shell = require('electron').shell;
var BookmarksWebApi = require('../app/build/bookmarksWebApi');
var BookmarksLogin = require('../app/build/bookmarksLogin');

function bookmarkItemClick(bookmarkUrl) {
    shell.openExternal(bookmarkUrl)
}

function deletebookmark(bookmarkId) {
    event.cancelBubble = true;
    if (window.confirm("真的要删除吗?")) {
        BookmarksWebApi.deleteBookmark(bookmarkId, function callbackSuccess(body) {
            toastr.success("删除成功");
            $('#bookmarks-item-lunagao-' + bookmarkId).remove();
        }, ErrorCB.showError);
    } else {
        // 不处理取消
    }
}

function modifybookmark(bookmarkId, jsonstr) {
    event.cancelBubble = true;
    var json = JSON.parse(jsonstr);
    showAlertModifyView(bookmarkId, json);
}

function doModifyBookmark(bookmarkId, title, linkUrl, dateAdded) {
    var summary = $('.bookmark-summary-modity-lunagao textarea').val();
    var tagStr = $('.bookmark-tag-modity-lunagao input').val();
    var jsonStr = '{"WzLinkId":'+bookmarkId+',"Title":"'+title+'","LinkUrl":"'+linkUrl+'","Summary":"'+summary+'","Tags":[';
    tagStr = tagStr.replace(/，/g,',');
    var tagStrs = new Array();
    tagStrs = tagStr.split(",");
    for (var i=0;i<tagStrs.length ;i++ ) 
    { 
        jsonStr += '"'+tagStrs[i]+'"';
        if (tagStrs.length - 1 != i) {
            jsonStr += ',';
        }
    } 
    jsonStr += '],"DateAdded": "'+dateAdded+'"}';
    BookmarksWebApi.modifyBookmark(bookmarkId, jsonStr, function callbackSuccess(body) {
            toastr.success("修改成功！");
            $(".showAlertLoginView-lunagao").remove();
            $(".showAlertLoginView-lunagao-bg").remove();
            BookmarksLogin.showBookmarks();
        }, ErrorCB.showError)
}

function cancelModifyBookmark() {
    $(".showAlertLoginView-lunagao").remove();
    $(".showAlertLoginView-lunagao-bg").remove();
}

function showAlertModifyView(bookmarkId, json) {
    var alertHtml = '<div class="showAlertLoginView-lunagao-bg"></div>';
    alertHtml += '<div class="showAlertLoginView-lunagao">';
    alertHtml += '<div class="bookmark-modify-alert-lunagao login-screen"><div class="login-form">';
    alertHtml += '<div class="bookmark-tag-modity-lunagao">标签：(逗号隔开)<input value="' + json.Tags + '"/></div>';
    alertHtml += '<div class="bookmark-summary-modity-lunagao">摘要：（不超过200字）<textarea>' + json.Summary + '</textarea></div>';
    alertHtml += '<div><a class="btn btn-success" onclick="doModifyBookmark(' + json.WzLinkId + ',\'' + json.Title + '\',\'' + json.LinkUrl + '\',\'' + json.DateAdded + '\')">确定</a><a class="btn btn-danger" onclick="cancelModifyBookmark()">取消</a></div>'
    alertHtml += '</div></div>';
    alertHtml += '</div>';
    $("body").append(alertHtml);
}