'use strict';

var search = require('../app/build/searchWebApi');
var toastr = require('toastr');
var BlogBody = require('../app/build/blogBody');
var NewsBody = require('../app/build/newsBody');
var KbArticlesBody = require('../app/build/kbArticleBody');
var ErrorCB = require('../app/build/errorCB');

var _category;
var _keyword;
var _pageIndexForSearch = 1;

function search_button_click_lunagao() {
    $('#search-result-list-lunagao').unbind('scroll');
    _pageIndexForSearch = 1;
    var category = $("input[name='optionsRadios']:checked").val();
    var keyword = $('#search-value-lunagao').val();
    if (keyword && keyword.replace(/(^\s*)|(\s*$)/g,'') != "") {
        $('#search-result-list-lunagao').empty();
        $('#search-result-list-lunagao').html('<img class="loading" src="./images/icons/svg/pencils.svg"/>');
        _category = category;
        _keyword = keyword;
        search.getSearch(_category, keyword, _pageIndexForSearch, 0, showSearchResult, function error(errorMessage) {
            ErrorCB.showError(errorMessage);
            $('#search-result-list-lunagao').empty();
            $('#search-result-list-lunagao').html('<h1>再找找看</h1>');
        });
    } else {
        toastr.error('在搜索框里面输入些东西再试试？');
    }
}

function search_item_click(itemId, commentCount, blogapp, uri, title) {
    search_item_click_bar_change(true);
    switch (_category) {
        case '1':
            var json = JSON.parse('{"Id":' + itemId + ',"BlogApp":"' + blogapp + '","CommentCount":' + commentCount + ',"Url":"'+uri+'","Title":"'+title+'"}');
            BlogBody.showBlogBody(json);
            break;
        case '2':
            var json = JSON.parse('{"Id":' + itemId + ',"CommentCount":' + commentCount + '}');
            NewsBody.showNewsBody(json);
            break;
        case '4':
            var json = JSON.parse('{"Id":' + itemId + '}');
            KbArticlesBody.showKbArticleBody(json);
            break;
        default:
            break;
    }
}

var _scrollTop_lunagao;

function search_item_click_bar_change(isViewDetail) {
    if (isViewDetail) {
        _scrollTop_lunagao = $('.content').scrollTop();
        $('#result-list-lunagao').hide();
        $('.searchbar-lunagao').hide();
        $('.detail-close-lunagao').show();
        $('#search-result-list-lunagao').append('<div id="container"></div>');
    } else {
        $('#result-list-lunagao').show();
        $('.searchbar-lunagao').show();
        $('#container').remove();
        $('.detail-close-lunagao').hide();
        $('.content').scrollTop(_scrollTop_lunagao);
    }
}

function showSearchResult(body) {
    var json = JSON.parse(body);
    if (json.length == 0) {
        toastr.info('啥都没找到 :(');
        $('#search-result-list-lunagao').empty();
        $('#search-result-list-lunagao').html('<h1>找找看别的？</h1>');
    } else {
        $('#search-result-list-lunagao').empty();
        showSearchResultList(json);
        if (_pageIndexForSearch == 1) { // 防止重复绑定
            $('#search-result-list-lunagao').scroll(function(){
                var viewH = $('#search-result-list-lunagao').height();//可见高度
                var contentH = $('#search-result-list-lunagao')[0].scrollHeight;//内容高度
                var scrollTop = $('#search-result-list-lunagao').scrollTop();//滚动高度
                console.log(scrollTop + ';' + contentH + ',' + viewH);
                if(scrollTop == (contentH -viewH)){
                    _pageIndexForSearch ++;
                    search.getSearch(_category, _keyword, _pageIndexForSearch, 0, showSearchResultAgain, ErrorCB.showError);
                }
            });
        }
    }
}

function showSearchResultAgain(body) {
    var json = JSON.parse(body);
    if (body == '[]') {
        toastr.info('翻遍千山万水，我都找完了···');
    } else {
        showSearchResultList(json);
    }
}

function showSearchResultList(json) {
    var htmlstr = '<div id="result-list-lunagao">';
    for (var variable in json) {
        htmlstr += '<div class="result-single-lunagao" onclick="search_item_click(' + json[variable].Id + ',' + json[variable].CommentTimes + ',\'' + json[variable].UserAlias + '\',\'' + json[variable].Uri + '\',\'' + json[variable].Title + '\')">';
        htmlstr += '<div class="result-title"><h6>' + json[variable].Title + '</h6></div>';
        htmlstr += '<div class="result-content">.......' + json[variable].Content + '.......</div>';
        if (json[variable].UserName != null) {
            htmlstr += '<div class="result-username"><small>@' + json[variable].UserName + '</small></div>';
        }
        // htmlstr += '<div class="result-useralias">' + json[variable].UserAlias + '</div>';
        htmlstr += '<div class="result-publichtime"><small>' + formatData(json[variable].PublishTime) + '</small></div>';
        // htmlstr += '<div class="result-votetime">' + json[variable].VoteTimes + '</div>';
        // htmlstr += '<div class="result-viewtimes">' + json[variable].ViewTimes + '</div>';
        htmlstr += '<div class="result-commenttimes"><small><i class="fui-new">(' + json[variable].CommentTimes + ')</i></small></div>';
        htmlstr += '</br>'
        htmlstr += '</div>';
    }
    htmlstr += '</div><div class="detail-close-lunagao btn btn-block btn-info" onclick="search_item_click_bar_change(false)"><span class="fui-arrow-left">返回</span></div>';
    $('#search-result-list-lunagao').append(htmlstr);
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