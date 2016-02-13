'use strict';

function setSearchBar() {
    $('.content').html(
        '<div>' + 
        '<div class="searchbar-lunagao palette-clouds"><div class="searchbar-input-lunagao"><input type="text" class="form-control login-field" value="" placeholder="传说中的搜索框" id="search-value-lunagao" onkeypress="if(event.keyCode==13) {search_button_click_lunagao();return false;}"></div>' + 
        '<div class="search-select-category-lunagao">' + 
        '<label class="radio checked"><span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span><input type="radio" name="optionsRadios" id="optionsRadios1" value="1" data-toggle="radio" checked="checked">博客</label>' + 
        '<label class="radio"><span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span><input type="radio" name="optionsRadios" id="optionsRadios2" value="2" data-toggle="radio">新闻</label>' + 
        '<label class="radio"><span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span><input type="radio" name="optionsRadios" id="optionsRadios2" value="4" data-toggle="radio">文库</label>' + 
        '</div>' + 
        '<div class="search-button-lunagao"><a class="btn btn-primary" href="#" onclick="search_button_click_lunagao()">搜索</a></div></div>' + 
        '</div>' + 
        '<div id="search-result-list-lunagao"><h1>找找看</h1></div>');
}

exports.showSearch = function showSearch(){
    setSearchBar();
}