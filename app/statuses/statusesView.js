'use strict';

var StatusesWebApi = require('../app/build/statusesWebApi');
var StatusesLogin = require('../app/build/statusesLogin');
var ErrorCB = require('../app/build/errorCB');

function publishButtonClick() {
    var comment = $(".publish-statuses-comment").val();
    var isPrivate = $(".publish-statuses-viewtype-lunagao").hasClass('checked');
    if (comment && comment.replace(/(^\s*)|(\s*$)/g,'') != "") {
        StatusesWebApi.publishStatuses(comment, isPrivate, publishStatusesCallbackSuccess, ErrorCB.showError);
    } else {
        alert("闪存内容不可为空");
    }
}

function SetIngTag() {
    var comment = $(".publish-statuses-comment").val();
    comment = '[标签]' + comment;
    $(".publish-statuses-comment").val(comment);
    $(".publish-statuses-comment").focus();
    $(".publish-statuses-comment")[0].setSelectionRange(1,3);
}

function changeStatusesType(type) {
    $('.statuses-type-lunagao a').removeClass('selected');
    $('#changeStatusesType-lunagao-' + type).addClass('selected');
    StatusesLogin.showStatusesByType(type);
}

function publishStatusesCallbackSuccess(params) {
    toastr.success(params);
    $(".publish-statuses-comment").val('');
    $(".publish-statuses-viewtype-lunagao").removeClass('checked');
}