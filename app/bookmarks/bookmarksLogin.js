'use strict';

var BookmarksWebApi = require('./bookmarksWebApi');
var ErrorCB = require('./errorCB');
var user = require('./user');

var _pageIndexForBookmarks = 1;

exports.showBookmarks = function showBookmarks() {
    $('.content').empty();
    _pageIndexForBookmarks = 1;
    $('.content').html(
        '<div class="bookmarks-main-lunagao"><img class="loading" src="./images/icons/svg/pencils.svg"/><div>'
        );
    BookmarksWebApi.getBookmarks(1, 20, bookmarksSuccessCallBack, ErrorCB.showError);
}

exports.hasBookmark = function hasBookmark(entity) {
    BookmarksWebApi.hasBookmark(entity.Url, function success(isHas) {
        if (!isHas) {
            $('#container').append('<script>var entity_lunagao = \''+JSON.stringify(entity)+'\'</script><a class="bookmark-button-float-lunagao btn btn-info" onclick="addbookmark(entity_lunagao)">收藏</a>');
        } else {
            $('#container').append('<script>var entity_lunagao = \''+JSON.stringify(entity)+'\'</script><a class="bookmark-button-float-lunagao btn btn-warning" onclick="deletebookmarkByUrl(entity_lunagao)">取消收藏</a>');
        }
    }, ErrorCB.showError);
}

function bookmarksSuccessCallBack(body) {
    // console.log(body);
    $('.loading').remove();
    var json = JSON.parse(body);
    if (json.length == 0) {
        $('.bookmarks-main-lunagao').unbind();
        $('.bookmarks-main-lunagao').append('<div class="nodata-lunagao"><h1>没有 :(</h1></div>');
        return;
    }
    var htmlstr = '';
    for (var variable in json) {
        // var str = JSON.stringify(json[variable]);
        htmlstr += '<script>var json_' + json[variable].WzLinkId + ' = \'' + JSON.stringify(json[variable]) + '\';</script>';
        htmlstr += '<div id="bookmarks-item-lunagao-' + json[variable].WzLinkId + '" class="bookmarks-item" onclick="bookmarkItemClick(\'' + json[variable].LinkUrl + '\')">';
        // htmlstr += '<div>' + json[variable].WzLinkId + '</div>';
        htmlstr += '<div>' + json[variable].Title + '</div>';
        // htmlstr += '<div>' + json[variable].LinkUrl + '</div>';
        htmlstr += '<blockquote>' + json[variable].Summary + '</blockquote>';
        htmlstr += '<div><small>标签：</small>';
        for (var tagCount in json[variable].Tags) {
            htmlstr += '<span>' + json[variable].Tags[tagCount] + '</span>';
        }
        htmlstr += '</div>';
        htmlstr += '<small>收藏于：' + formatData(json[variable].DateAdded) + '</small>';
        htmlstr += '<a class="btn btn-danger" onclick="deletebookmark(' + json[variable].WzLinkId + ')">删除</a>';
        htmlstr += '<a class="btn btn-info" onclick="modifybookmark(' + json[variable].WzLinkId + ', json_' + json[variable].WzLinkId + ')">修改</a>';
        htmlstr += '</div>';
    }
    $('.bookmarks-main-lunagao').append(htmlstr);
    if (_pageIndexForBookmarks == 1) { // 防止重复绑定
        $('.bookmarks-main-lunagao').scroll(function(){
			var viewH = $('.bookmarks-main-lunagao').height();//可见高度
			var contentH = $('.bookmarks-main-lunagao')[0].scrollHeight;//内容高度
 			var scrollTop = $('.bookmarks-main-lunagao').scrollTop();//滚动高度
            // console.log(scrollTop + ';' + contentH + ',' + viewH);
			if(scrollTop == (contentH -viewH)){ //减去20是为了减去顶部的padding。
				_pageIndexForBookmarks ++;
				BookmarksWebApi.getBookmarks(_pageIndexForBookmarks, 20, bookmarksSuccessCallBack, ErrorCB.showError);
			}
		});
    }
}