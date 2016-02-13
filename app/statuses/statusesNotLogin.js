'use strict';

var StatusesWebApi = require('./statusesWebApi');
var toastr = require('toastr');
var ErrorCB = require('./errorCB');

var _pageIndexForStatuses = 1;

exports.showStatusesNotLogin = function showStatusesNotLogin() {
    _pageIndexForStatuses = 1;
    showLoginButton();
    StatusesWebApi.getStatusesByType('all', _pageIndexForStatuses, 30, '', statusesNotLoginSuccessCallBack, ErrorCB.showError);
}

function showLoginButton() {
    $('.content').html(
        '<div class="statuses-login-button-lunagao">' + 
        '<a class="btn btn-lg btn-primary" onclick="$(\'#user\').click()">点击这里登录吧</a>' + 
        '</div>' + 
        '<div class="statuses-result-list-lunagao"><img class="loading" src="./images/icons/svg/pencils.svg"/></div>'
        );
}

function statusesNotLoginSuccessCallBack(body) {
    if (_pageIndexForStatuses == 1) {
        $('.statuses-result-list-lunagao').empty();
    }
    var json = JSON.parse(body);
    // console.log(body);
    var htmlstr = '';
    for (var variable in json) {
        htmlstr += '<div id="statuses-result-list-item-lunagao-' + json[variable].Id + '" class="statuses-result-list-item-lunagao">'
        htmlstr += '<div class="statuses-result-list-item-UserIconUrl-lunagao"><img src=' + json[variable].UserIconUrl + ' class="img-rounded" /></div>';
        htmlstr += '<div class="statuses-result-list-item-username-lunagao">' + json[variable].UserDisplayName + '</div>';
        htmlstr += '<div class="statuses-result-list-item-date-lunagao"><small>' + formatData(json[variable].DateAdded) + '</small></div>';
        if (json[variable].IsLucky) {
            htmlstr += '<div class="statuses-result-list-item-lucky-lunagao"><span class="fui-heart"></span></div>';
        }
        htmlstr += '<div>' + json[variable].Content + '</div>';
        if (json[variable].CommentCount != 0) {
            getStatusesNotLoginComments(json[variable].Id);
            htmlstr += '<div class="statuses-result-list-item-comments-lunagao"><small>回复正在拼命加载中···</small></div>';
        }
        // htmlstr += '<div>' + json[variable].IsPrivate + '</div>';
        // htmlstr += '<div>' + json[variable].Id + '</div>';
        // htmlstr += '<div>' + json[variable].UserAlias + '</div>';
        // htmlstr += '<div>' + json[variable].UserId + '</div>';
        // htmlstr += '<div>' + json[variable].UserGuid + '</div>';
        htmlstr += '</div>';
    }
    $('.statuses-result-list-lunagao').append(htmlstr);
    if (_pageIndexForStatuses == 1) { // 防止重复绑定
        $('.statuses-result-list-lunagao').scroll(function(){
			var viewH = $('.statuses-result-list-lunagao').height();//可见高度
			var contentH = $('.statuses-result-list-lunagao')[0].scrollHeight;//内容高度
 			var scrollTop = $('.statuses-result-list-lunagao').scrollTop();//滚动高度
            // console.log(scrollTop + ';' + contentH + ',' + viewH);
			if(scrollTop == (contentH -viewH - 20)){ //减去20是为了减去顶部的那个登录按钮做的。
				_pageIndexForStatuses ++;
				StatusesWebApi.getStatusesByType('all', _pageIndexForStatuses, 30, '', statusesNotLoginSuccessCallBack, ErrorCB.showError);
			}
		});
    }
}

function getStatusesNotLoginComments(statusId) {
    StatusesWebApi.getStatusesComments(statusId, function successCallBack(body) {
        var json = JSON.parse(body);
        var htmlstr = '';
        for (var variable in json) {
            htmlstr += '<div class="statuses-result-list-item-comments-item-lunagao">';
            htmlstr += '<img src=' + json[variable].UserIconUrl + ' class="img-rounded usericon-lunagao" />';
            htmlstr += '<small class="userdisplayname-lunagao">' + json[variable].UserDisplayName + '</small>';
            htmlstr += '<small>' + formatData(json[variable].DateAdded) + '</small>';
            htmlstr += '<div class="statuses-comment-content-lunagao"><small>' + json[variable].Content + '</small></div>';
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

function formatData(value) {
  var returnValue = value.substr(0, 4) + '年';
  returnValue += value.substr(5, 2) + '月';
  returnValue += value.substr(8, 2) + '日 ';
  returnValue += value.substr(11, 2) + '时';
  returnValue += value.substr(14, 2) + '分';
  returnValue += value.substr(17, 2) + '秒';
  return returnValue;
}