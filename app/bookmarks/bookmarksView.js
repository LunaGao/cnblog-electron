'use strict';

const shell = require('electron').shell;
var BookmarksWebApi = require('../app/build/bookmarksWebApi');
var BookmarksLogin = require('../app/build/bookmarksLogin');

function bookmarkItemClick(bookmarkUrl) {
    shell.openExternal(bookmarkUrl)
}

function addbookmark(entity) {
    var json = JSON.parse(entity);
    var alertHtml = '<div class="showAlertLoginView-lunagao-bg"></div>';
    alertHtml += '<div class="showAlertLoginView-lunagao">';
    alertHtml += '<div class="bookmark-modify-alert-lunagao login-screen"><div class="login-form">';
    alertHtml += '<div class="bookmark-tag-modity-lunagao">标签：(逗号隔开，可以为空)<input value=""/></div>';
    alertHtml += '<div class="bookmark-summary-modity-lunagao">摘要：（不超过200字，可以为空）<textarea></textarea></div>';
    alertHtml += '<div><a class="btn btn-success" onclick="addbookmarkToService(\'' + json.Title + '\',\'' + json.Url + '\')">确定</a><a class="btn btn-danger" onclick="cancelModifyBookmark()">取消</a></div>'
    alertHtml += '</div></div>';
    alertHtml += '</div>';
    $("body").append(alertHtml);
}

function addbookmarkToService(title, url) {
    var summary = $('.bookmark-summary-modity-lunagao textarea').val();
    var tagStr = $('.bookmark-tag-modity-lunagao input').val();
    var jsonStr = '{"WzLinkId":0,"Title":"'+title+'","LinkUrl":"'+url+'","Summary":"'+summary+'","Tags":[';
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
    jsonStr += '],"DateAdded": "'+getNowFormatDate()+'"}';
    BookmarksWebApi.addBookmark(jsonStr, function callbackSuccess(body) {
            toastr.success("收藏成功！");
            $(".showAlertLoginView-lunagao").remove();
            $(".showAlertLoginView-lunagao-bg").remove();
            $('.bookmark-button-float-lunagao').html("取消收藏");
            $('.bookmark-button-float-lunagao').removeClass("btn-info");
            $('.bookmark-button-float-lunagao').addClass("btn-warning");
            $('.bookmark-button-float-lunagao').removeAttr("onclick");
            $('.bookmark-button-float-lunagao').attr("onclick","deletebookmarkByUrl(entity_lunagao)");
        }, ErrorCB.showError)
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

function deletebookmarkByUrl(entity) {
    var json = JSON.parse(entity);
    event.cancelBubble = true;
    if (window.confirm("真的要删除吗?")) {
        BookmarksWebApi.deletebookmarkByUrl(json.Url, function callbackSuccess(body) {
            toastr.success("删除成功");
            $('.bookmark-button-float-lunagao').html("收藏");
            $('.bookmark-button-float-lunagao').removeClass("btn-warning");
            $('.bookmark-button-float-lunagao').addClass("btn-info");
            $('.bookmark-button-float-lunagao').removeAttr("onclick");
            $('.bookmark-button-float-lunagao').attr("onclick","addbookmark(entity_lunagao)");
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

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "T" + date.getHours() + seperator2 + date.getMinutes()
            + "." + date.getSeconds() + ".0000000+08:00";
    return currentdate;
}