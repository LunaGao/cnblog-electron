'use strict';

var blogWebApi = require('../app/build/blogsWebApi');
var newsWebApi = require('../app/build/newsWebApi');

var ErrorCB = require('../app/build/errorCB');
var toastr = require('toastr');

function userleavecommentBlog(blogApp, postId) {
    var comment = $(".leaveBlogCommentBody").val();
    if (comment && comment.replace(/(^\s*)|(\s*$)/g,'') != "") {
        blogWebApi.setBlogComment(blogApp, postId, comment + '\n<来自:博客园客户端>', leaveCommentCallbackSuccess, ErrorCB.showError);
    } else {
        alert("留言内容不可为空");
    }
}

function userleavecommentNews(newsId, parentId) {
    var comment = $(".leaveBlogCommentBody").val();
    if (comment && comment.replace(/(^\s*)|(\s*$)/g,'') != "") {
        newsWebApi.setNewsComment(newsId, parentId, comment + '\n<来自:博客园客户端>', leaveCommentCallbackSuccess, ErrorCB.showError);
    } else {
        alert("留言内容不可为空");
    }
}

function leaveCommentCallbackSuccess(params) {
    toastr.success('稍后出现在评论列表里哦~', params);
    $(".leaveBlogCommentBody").val('');
}