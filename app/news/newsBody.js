'use strict';

var newsWebApi = require('./newsWebApi');
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

function getNewsCommentsView(value) {
  var json = JSON.parse(value);
  var returnValue = '<div class=\'blogComments\'>';
  for (var variable in json) {
    returnValue += '<div class=\'blogComment\'><div class=\'Author\'><h6>' + json[variable].UserName + '</h6></div>';
    returnValue += '<blockquote class=\'blogCommentBody\'><p>' + json[variable].CommentContent + '</p>';
    returnValue += '<small>' + formatData(json[variable].DateAdded) + '</small></blockquote></div>';
  }
  returnValue += '</div>';
  return returnValue;
}

exports.showNewsBody = function showNewsBody(news){
  document.getElementById("container").innerHTML = '<img class=\'loading\' src=\'../node_modules/flat-ui/images/icons/svg/pencils.svg\' alt=\'Pensils\'>';
  newsWebApi.getNewBody(news.Id, function callbackSuccess(value) {
    document.getElementById("container").innerHTML = value;
    if (news.CommentCount != 0) {
      showNewComments(news);
    }
  }, function callbackError(errordata) {
      ErrorCB.showError(errordata);
    document.getElementById("container").innerHTML = '失败了···';
  });
}

function showNewComments(news) {
  newsWebApi.getNewComments(news.Id, 1, news.CommentCount, function callbackSuccess(value) {
    // console.log(value);
    $("#container").append(getNewsCommentsView(value));
  }, ErrorCB.showError);
}
