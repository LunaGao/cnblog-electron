'use strict';

var StatusesWebApi = require('./statusesWebApi');
var ErrorCB = require('./errorCB');
var user = require('./user');

var _pageIndexForStatusesAll = 1;
var _typeForStatuses = 'all';

exports.showStatuses = function showStatuses() {
    _pageIndexForStatusesAll = 1;
    showPublishStatusesView();
    $('.statuses-result-list-login-lunagao').html('<img class="loading" src="./images/icons/svg/pencils.svg"/>');
    StatusesWebApi.getStatusesByType('all', 1, 30, '', statusesLoginSuccessCallBack, ErrorCB.showError);
}

exports.showStatusesByType = function showStatusesByType(type) {
    _pageIndexForStatusesAll = 1;
    _typeForStatuses = type;
    $('.statuses-result-list-login-lunagao').empty();
    $('.statuses-result-list-login-lunagao').html('<img class="loading" src="./images/icons/svg/pencils.svg"/>');
    StatusesWebApi.getStatusesByType(_typeForStatuses, 1, 30, '', statusesLoginSuccessCallBack, ErrorCB.showError);
}

function showPublishStatusesView() {
    $('.content').html(
        '<div class="statuses-publish-lunagao">' + 
        '<img src=' + localStorage.getItem('Avatar') + ' class="img-rounded publish-user-avatar-lunagao" />' + 
        '<h4 class="publish-user-name-lunagao">'+ localStorage.getItem('DisplayName') + '</h4>' + 
        '<div class="publish-statuses-comment-div"><textarea class="publish-statuses-comment" placeholder="你在做什么？你在想什么？"/></div>' + 
        '<div>' + 
        '<label class="publish-statuses-viewtype-lunagao checkbox"><span class="icons"><span class="first-icon fui-checkbox-unchecked"></span><span class="second-icon fui-checkbox-checked"></span></span><input type="checkbox" value="" id="checkbox2" data-toggle="checkbox">私有</label>' + 
        '<a class="publish-statuses-addtag-lunagao" href="#" onclick="SetIngTag()">加标签</a>' + 
        '<a class="btn btn-block btn-lg btn-success publish-statuses-publish-lunagao" onclick="publishButtonClick()">发布</a>' + 
        '</div>' + 
        '</div>' + 
        '<div style="height:100%;">' +
        '<div class="statuses-type-lunagao">' +
        '<a id="changeStatusesType-lunagao-all" href="#" class="selected" onclick="changeStatusesType(\'all\')">全站</a>' + 
        '<a id="changeStatusesType-lunagao-following" href="#" onclick="changeStatusesType(\'following\')">关注</a>' + 
        '<a id="changeStatusesType-lunagao-my" href="#" onclick="changeStatusesType(\'my\')">我的</a>' + 
        '<a id="changeStatusesType-lunagao-mycomment" href="#" onclick="changeStatusesType(\'mycomment\')">我回应</a>' + 
        '<a id="changeStatusesType-lunagao-recentcomment" href="#" onclick="changeStatusesType(\'recentcomment\')">新回应</a>' + 
        '<a id="changeStatusesType-lunagao-mention" href="#" onclick="changeStatusesType(\'mention\')">提到我</a>' + 
        '<a id="changeStatusesType-lunagao-comment" href="#" onclick="changeStatusesType(\'comment\')">回复我</a>' + 
        '</div>' + 
        '<div class="statuses-result-list-login-lunagao statuses-result-list-lunagao"></div>' + 
        '</div>'
        );
}

function statusesLoginSuccessCallBack(body) {
    $('.loading').remove();
    var json = JSON.parse(body);
    if (json.length == 0) {
        $('.statuses-result-list-lunagao').unbind();
        $('.statuses-result-list-lunagao').append('<div class="nodata-lunagao"><h1>没有 :(</h1></div>');
        return;
    }
    var htmlstr = '';
    for (var variable in json) {
        htmlstr += '<div id="statuses-result-list-item-lunagao-' + json[variable].Id + '" class="statuses-result-list-item-lunagao">';
        htmlstr += '<div class="statuses-result-list-item-UserIconUrl-lunagao"><img src=' + json[variable].UserIconUrl + ' class="img-rounded" /></div>';
        htmlstr += '<div class="statuses-result-list-item-username-lunagao">' + json[variable].UserDisplayName + '</div>';
        if (json[variable].UserGuid == user.getUserId()) {
            htmlstr += '<div class="delete-lunagao" onclick="deleteStatuses(' + json[variable].Id + ')"><span class="fui-cross"></span></div>';
        }
        if (json[variable].IsPrivate) {
            htmlstr += '<div class="private-lunagao" onclick="privateStatusesShowTip()"><span class="fui-lock"></span></div>';
        }
        htmlstr += '<div class="statuses-result-list-item-date-lunagao"><small>' + formatData(json[variable].DateAdded) + '</small></div>';
        if (json[variable].IsLucky) {
            htmlstr += '<div class="statuses-result-list-item-lucky-lunagao"><span class="fui-heart"></span></div>';
        }
        htmlstr += '<div>' + json[variable].Content + '</div>';
        var replayFuncStr = '';
        if (json[variable].StatusId) {
            replayFuncStr = 'replyStatuse(' + json[variable].StatusId + ',' + json[variable].UserId + ',' + json[variable].Id + ')';
        } else {
            replayFuncStr = 'replyStatuse(' + json[variable].Id + ',null,' + json[variable].Id + ')';
        }
        htmlstr += '<div class="reply-statuse-lunagao"><span class="fui-chat reply-statuse-lunagao" onclick="showReplyStatuseView(' + json[variable].Id + ')">回应</span>' +
            '<div id="reply-statuse-lunagao-' + json[variable].Id + '" style="display:none;">' + 
            '<input class="reply-comment-lunagao" onkeypress="if(event.keyCode==13) {' + replayFuncStr + ';return false;}" value="';
        if (json[variable].StatusId) {
            htmlstr += '@' + json[variable].UserDisplayName + '：';
        }
        htmlstr += '"/><span class="fui-check" onclick="' + replayFuncStr + '">提交</span></div>' + 
            '</div>';
        if (json[variable].CommentCount != 0) {
            getStatusesLoginComments(json[variable].Id);
            htmlstr += '<div id="statuses-comments-lunagao-' + json[variable].Id + '" class="statuses-result-list-item-comments-lunagao"><small>回复正在拼命加载中···</small></div>';
        } else {
            htmlstr += '<div id="statuses-comments-lunagao-' + json[variable].Id + '" class="statuses-result-list-item-comments-lunagao"></div>';
        }
        // htmlstr += '<div>' + json[variable].Id + '</div>';
        // htmlstr += '<div>' + json[variable].UserAlias + '</div>';
        // htmlstr += '<div>' + json[variable].UserId + '</div>';
        // htmlstr += '<div>' + json[variable].UserGuid + '</div>';
        htmlstr += '</div>';
    }
    $('.statuses-result-list-lunagao').append(htmlstr);
    if (_pageIndexForStatusesAll == 1) { // 防止重复绑定
        $('.statuses-result-list-lunagao').scroll(function(){
			var viewH = $('.statuses-result-list-lunagao').height();//可见高度
			var contentH = $('.statuses-result-list-lunagao')[0].scrollHeight;//内容高度
 			var scrollTop = $('.statuses-result-list-lunagao').scrollTop();//滚动高度
            // console.log(scrollTop + ';' + contentH + ',' + viewH);
			if(scrollTop == (contentH -viewH - 20)){ //减去20是为了减去顶部的padding。
				_pageIndexForStatusesAll ++;
				StatusesWebApi.getStatusesByType(_typeForStatuses , _pageIndexForStatusesAll, 30, '', statusesLoginSuccessCallBack, Error.showError);
			}
		});
    }
}

exports.reloadStatusesComments = function reloadStatusesComments(statusId) {
    var commentDiv = $('#statuses-comments-lunagao-' + statusId).empty();
    commentDiv.empty();
    commentDiv.html('<small>回复正在拼命加载中···</small>');
    commentDiv.html(getStatusesLoginComments(statusId));
}

function getStatusesLoginComments(statusId) {
    StatusesWebApi.getStatusesComments(statusId, function successCallBack(body) {
        var json = JSON.parse(body);
        var htmlstr = '';
        for (var variable in json) {
            htmlstr += '<div id="statuses-result-list-item-comments-item-lunagao-' + json[variable].StatusId + '-' + json[variable].Id + '" class="statuses-result-list-item-comments-item-lunagao">';
            htmlstr += '<img src=' + json[variable].UserIconUrl + ' class="img-rounded usericon-lunagao" />';
            htmlstr += '<small class="userdisplayname-lunagao">' + json[variable].UserDisplayName + '</small>';
            htmlstr += '<small>' + formatData(json[variable].DateAdded) + '</small>';
            if (json[variable].UserGuid == user.getUserId()) {
                htmlstr += '<div class="comments-delete-lunagao" onclick="deleteStatusesComment(' + json[variable].StatusId + ',' + json[variable].Id + ')"><span class="fui-cross"></span></div>';
            }
            htmlstr += '<div class="statuses-comment-content-lunagao"><small>' + json[variable].Content + '</small>';
            if (json[variable].UserGuid != user.getUserId()) {
                htmlstr += '<span class="fui-chat reply-statuse-lunagao" onclick="showReplyStatuseView(' + json[variable].Id + ',true)">回应</span>' +
                    '<div id="reply-statuse-lunagao-' + json[variable].Id + '" style="display:none;"><input class="reply-comment-lunagao" value="@' + json[variable].UserDisplayName + '：" onkeypress="if(event.keyCode==13){replyStatuse(' + json[variable].StatusId + ',' + json[variable].UserId + ',' + json[variable].Id + ');return false;}"/><span class="fui-check" onclick="replyStatuse(' + json[variable].StatusId + ',' + json[variable].UserId + ',' + json[variable].Id + ')">提交</span></div>';
            }
            htmlstr += '</div>';
            // htmlstr += '<div>' + json[variable].Id + '</div>';
            // htmlstr += '<div>' + json[variable].StatusId + '</div>';
            // htmlstr += '<div>' + json[variable].UserAlias + '</div>';
            // htmlstr += '<div>' + json[variable].UserId + '</div>';
            // htmlstr += '<div>' + json[variable].UserGuid + '</div>';
            htmlstr += '</div>'
        }
        $('#statuses-result-list-item-lunagao-' + statusId + ' .statuses-result-list-item-comments-lunagao').html(htmlstr);
    }, ErrorCB.showError);
}