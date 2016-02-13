'use strict';

var BlogsItem = require('./blogsItem');
var BlogsWebApi = require('./blogsWebApi');
var ErrorCB = require('./errorCB');
var pageIndex = 0;

var BlogsList = React.createClass({
	callbackSuccess: function(value) {
		this.setState({data: this.state.data.concat(value)});
	},
	loadBlogsFromServer: function() {
		BlogsWebApi.getBlogs(pageIndex, 30, this.callbackSuccess, ErrorCB.showError);
	},
	getInitialState: function() {
		var theBlogList = this;
		$("#list-cnblogs-lunagao").scroll(function(){
			var viewH = $("#list-cnblogs-lunagao").height();//可见高度
			var contentH = $("#list-cnblogs-lunagao").get(0).scrollHeight;//内容高度
 			var scrollTop = $("#list-cnblogs-lunagao").scrollTop();//滚动高度
			if(scrollTop == (contentH -viewH)){ //到达底部100px时,加载新内容
				pageIndex ++;
				theBlogList.loadBlogsFromServer();
			}
		});
		return {data : []};
	},
	componentDidMount: function() {
		pageIndex = this.props.pageIndex;
		this.loadBlogsFromServer();
  },
	render: function() {
		if (this.state.data.length != 0) {
			return (
				<BlogsItem data={this.state.data}/>
			);
		} else {
			return (
				<img className="loading" src='../node_modules/flat-ui/images/icons/svg/pencils.svg'/>
			);
		}
	}
});

exports.showBlogs = function showBlogs(){
	ReactDOM.render(
		<BlogsList pageIndex={1}/> ,
		document.getElementById('list-cnblogs-lunagao')
	);
}
