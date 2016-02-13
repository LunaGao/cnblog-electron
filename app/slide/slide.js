'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Blogs = require('../app/build/blogs');
var News = require('../app/build/news');
var KbArticles = require('../app/build/KbArticles');
var User = require('../app/build/user');
var Search = require('../app/build/search')
var Statuses = require('../app/build/statuses');

function setActivity(slideItem) {
  $('.slide ul li').removeClass('activity');
  $(slideItem).addClass('activity');
  var list = $('#list-cnblogs-lunagao');
  // 注释掉此判断是由于页面没有清除掉一些其他的无用元素，但由此引出了页面点击刷新的状态。
//   if(list.length > 0){
//   } else {
      $('.content').empty();
//   }
};

$('.slide').on('click', '#blogs', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('博客');
    setActivity(this);
    $('.content').html('<div id="list-cnblogs-lunagao"></div><div id="container"></div>');
    Blogs.showBlogs();
    document.getElementById("container").innerHTML = '<h1>手持两把锟斤拷，</h1><h1>口中疾呼烫烫烫。</h1><h1>脚踏千朵屯屯屯，</h1><h1>笑看万物锘锘锘。</h1>' +
      '<br><small style=\'float:right;\'>---- @我已成妖 (dawn110110), 知乎(www.zhihu.com)';
  }
});

$('.slide').on('click', '#news', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('新闻');
    setActivity(this);
    $('.content').html('<div id="list-cnblogs-lunagao"></div><div id="container"></div>');
    News.showNews();
    document.getElementById("container").innerHTML = '<h1>荆轲刺秦王</h1>' +
      '<br><small style=\'float:right;\'>---- 《战国策·燕策三》';
  }
});

$('.slide').on('click', '#kbArticles', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('知识库');
    setActivity(this);
    $('.content').html('<div id="list-cnblogs-lunagao"></div><div id="container"></div>');
    KbArticles.showKbArticles();
    document.getElementById("container").innerHTML = '<h1>Knowledge is POWER.</h1><small style=\'float:right;\'>---- by Francis Bacon,British philosopher</small>' +
      '<br><h2>孬累指 椅滋 啪握儿</h2><small style=\'float:right;\'>---- 中(no)文(zuo)发(no)音(die)</small>';
  }
});

$('.slide').on('click', '#user', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('我的博客');
    setActivity(this);
    User.showUserInfo();
  }
});

$('.slide').on('click', '#statuses', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('闪存');
    setActivity(this);
    Statuses.showStatuses();
  }
});

$('.slide').on('click', '#bookmarks', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('收藏');
    setActivity(this);
    User.showUserInfo();
  }
});

$('.slide').on('click', '#zzkDocument', function () {
  if(!$(this).hasClass('.activity')) {
    $('.slideLabel').text('搜索');
    setActivity(this);
    Search.showSearch();
  }
});

document.oncontextmenu = new Function("event.returnValue=false");
document.onselectstart = new Function("event.returnValue=false");
