'use strict';

var newsWebApi = require('./newsWebApi');
var User = require('./user');
var ErrorCB = require('./errorCB');

function formatData(value) {
  var returnValue = value.substr(0, 4) + '年';
  returnValue += value.substr(5, 2) + '月';
  returnValue += value.substr(8, 2) + '日 ';
  returnValue += value.substr(11, 2) + '时';
  returnValue += value.substr(14, 2) + '分';
  returnValue += value.substr(17, 2) + '秒';
  return returnValue;
}

function getNewsCommentsView(value, news) {
  var json = JSON.parse(value);
  var returnValue = '<div class=\'blogComments\'>';
  for (var variable in json) {
    returnValue += '<div class=\'blogComment\'><div class=\'Author\'><h6>' + json[variable].UserName + '</h6></div>';
    returnValue += '<blockquote class=\'blogCommentBody\'><p>' + json[variable].CommentContent + '</p>';
    returnValue += '<small>' + formatData(json[variable].DateAdded) + '</small></blockquote></div>';
  }
  returnValue += leaveComment(news);
  returnValue += '</div>';
  return returnValue;
}

function leaveComment(news) {
    var commentHtml;
    if (User.isHasLogin()) {
        commentHtml = '<div class="commentLeaveMessage blogComment"><div class="Author"><h6>' + localStorage.getItem('DisplayName') + '</h6></div>';
        commentHtml += '<textarea class="blogCommentBody leaveBlogCommentBody" />';
        commentHtml += '<div class="comment-need-login"><a href="#" class="btn btn-block btn-lg btn-primary" onclick="userleavecommentNews(' + news.Id + ',0);">回复</a></div>';
        commentHtml += '</div>';
    } else {
        commentHtml = '<div class="blogComment"><div class="comment-need-login">';
        commentHtml += '<a href="#" class="btn btn-block btn-lg btn-primary" onclick="alertLoginView()">回复需要登录</a>';
        commentHtml += '</div></div>';
    }
    return commentHtml;
}

exports.showNewsBody = function showNewsBody(news){
  document.getElementById("container").innerHTML = '<img class=\'loading\' src=\'../node_modules/flat-ui/images/icons/svg/pencils.svg\' alt=\'Pensils\'>';
  newsWebApi.getNewBody(news.Id, function callbackSuccess(value) {
    document.getElementById("container").innerHTML = value;
    // if (news.CommentCount != 0) {
      showNewComments(news);
    // }
  }, function callbackError(errordata) {
      ErrorCB.showError(errordata);
    document.getElementById("container").innerHTML = '失败了···';
  });
}

function showNewComments(news) {
  newsWebApi.getNewComments(news.Id, 1, news.CommentCount, function callbackSuccess(value) {
    // console.log(value);
    $("#container").append(getNewsCommentsView(value, news));
  }, ErrorCB.showError);
}
