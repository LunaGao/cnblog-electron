'use strict';

var NewsItem = require('./newsItem');
var NewsWebApi = require('./newsWebApi');
var ErrorCB = require('./errorCB');
var pageIndex = 0;

var NewsList = React.createClass({
	callbackSuccess: function(value) {
		this.setState({data: this.state.data.concat(value)});
	},
	loadNewsFromServer: function() {
		NewsWebApi.getNews(pageIndex, 30, this.callbackSuccess, ErrorCB.showError);
	},
	getInitialState: function() {
		var theNewList = this;
		$("#list-cnblogs-lunagao").scroll(function(){
			var viewH = $("#list-cnblogs-lunagao").height();//可见高度
			var contentH = $("#list-cnblogs-lunagao").get(0).scrollHeight;//内容高度
 			var scrollTop = $("#list-cnblogs-lunagao").scrollTop();//滚动高度
			if(scrollTop == (contentH -viewH)){ //到达底部100px时,加载新内容
				pageIndex ++;
				theNewList.loadNewsFromServer();
			}
		});
		return {data : []};
	},
	componentDidMount: function() {
		pageIndex = this.props.pageIndex;
		this.loadNewsFromServer();
  },
	render: function() {
		if (this.state.data.length != 0) {
			return (
				<NewsItem data={this.state.data}/>
			);
		} else {
			return (
				<img className="loading" src='../node_modules/flat-ui/images/icons/svg/pencils.svg'/>
			);
		}
	}
});

exports.showNews = function showNews(){
	ReactDOM.render(
		<NewsList pageIndex={1}/>,
		document.getElementById('list-cnblogs-lunagao')
	);
}
