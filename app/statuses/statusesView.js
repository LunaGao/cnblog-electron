'use strict';

var StatusesWebApi = require('../app/build/statusesWebApi');
var StatusesLogin = require('../app/build/statusesLogin');
var ErrorCB = require('../app/build/errorCB');
var toastr = require('toastr');

function publishButtonClick() {
    var comment = $(".publish-statuses-comment").val();
    var isPrivate = $(".publish-statuses-viewtype-lunagao").hasClass('checked');
    if (comment && comment.replace(/(^\s*)|(\s*$)/g,'') != "") {
        StatusesWebApi.publishStatuses(comment, isPrivate, publishStatusesCallbackSuccess, ErrorCB.showError);
    } else {
        alert("闪存内容不可为空");
    }
}

function deleteStatuses(statusesId) {
    if (window.confirm("真的要删除吗?")) {
        StatusesWebApi.deleteStatuses(statusesId, function callbackSuccess(body) {
            toastr.success("删除成功");
            $('#statuses-result-list-item-lunagao-' + statusesId).remove();
        }, ErrorCB.showError);
    } else {
        // 不处理取消
    }
}

function deleteStatusesComment(statusesId, commentId) {
    if (window.confirm("真的要删除吗?")) {
        StatusesWebApi.deleteStatusesComment(statusesId, commentId, function callbackSuccess(body) {
            toastr.success("删除成功");
            $('#statuses-result-list-item-comments-item-lunagao-' + statusesId + '-' + commentId).remove();
        }, ErrorCB.showError);
    } else {
        // 不处理取消
    }
}

function privateStatusesShowTip() {
    toastr.info("这是一条私有闪存哦~亲~ :D")
}

function SetIngTag() {
    var comment = $(".publish-statuses-comment").val();
    comment = '[标签]' + comment;
    $(".publish-statuses-comment").val(comment);
    $(".publish-statuses-comment").focus();
    $(".publish-statuses-comment")[0].setSelectionRange(1,3);
}

function showReplyStatuseView(statuseId,nextLine) {
    var view = $("#reply-statuse-lunagao-" + statuseId);
    
    if (nextLine) {
        if (view.css("display") == 'none') {
            view.css("display",'block');
            view.prev().text("取消");
            view.prev().removeClass();
            view.prev().addClass('reply-statuse-lunagao');
            view.prev().addClass('fui-cross');
            view.prev().css('color', '#E74C3C');
        } else {
            view.css("display",'none');
            view.prev().text("回应");
            view.prev().removeClass();
            view.prev().addClass('reply-statuse-lunagao');
            view.prev().addClass('fui-chat');
            view.prev().css('color', '#2980B9');
        }
        return;
    }
    
    if (view.css("display") == 'none') {
        view.css("display",'initial');
        view.prev().text("取消");
        view.prev().removeClass();
        view.prev().addClass('reply-statuse-lunagao');
        view.prev().addClass('fui-cross');
        view.prev().css('color', '#E74C3C');
    } else {
        view.css("display",'none');
        view.prev().text("回应");
        view.prev().removeClass();
        view.prev().addClass('reply-statuse-lunagao');
        view.prev().addClass('fui-chat');
        view.prev().css('color', '#2980B9');
    }
}

function replyStatuse(statusesId, replyTo, parentCommentId) {
    var comment = $("#reply-statuse-lunagao-" + parentCommentId + " input").val();
    if (comment && comment.replace(/(^\s*)|(\s*$)/g,'') != "") {
        StatusesWebApi.replyStatuses(statusesId, replyTo, parentCommentId, comment, function replaySuccessCallBack(params) {
            toastr.success("回应成功 :P");
            StatusesLogin.reloadStatusesComments(statusesId);
            var view = $("#reply-statuse-lunagao-" + statusesId);
            view.css("display",'none');
            view.prev().text("回应");
            view.prev().removeClass();
            view.prev().addClass('fui-chat');
            view.prev().css('color', '#2980B9');
            $("#reply-statuse-lunagao-" + parentCommentId + " input").val('');
        }, ErrorCB.showError);
    } else {
        alert("回应内容不可为空");
    }
}

function changeStatusesType(type) {
    $('.statuses-type-lunagao a').removeClass('selected');
    $('#changeStatusesType-lunagao-' + type).addClass('selected');
    $('.statuses-result-list-lunagao').unbind();
    StatusesLogin.showStatusesByType(type);
}

function publishStatusesCallbackSuccess(params) {
    toastr.success(params);
    $(".publish-statuses-comment").val('');
    $(".publish-statuses-viewtype-lunagao").removeClass('checked');
}