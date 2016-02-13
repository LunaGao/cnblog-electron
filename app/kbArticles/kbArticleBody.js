'use strict';

var kbArticleWebApi = require('./kbArticlesWebApi');
var ErrorCB = require('./errorCB');

exports.showKbArticleBody = function showKbArticleBody(kbArticles){
  document.getElementById("container").innerHTML = '<img class=\'loading\' src=\'../node_modules/flat-ui/images/icons/svg/pencils.svg\' alt=\'Pensils\'>';
  kbArticleWebApi.getKbArticleBody(kbArticles.Id, function callbackSuccess(value) {
    document.getElementById("container").innerHTML = value;
  }, function callbackError(errordata) {
      ErrorCB.showError(errordata);
    document.getElementById("container").innerHTML = '失败了···';
  });
}
