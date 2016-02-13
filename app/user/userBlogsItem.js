'use strict';

var BlogBody = require('./blogBody');

function formatData(value) {
  var returnValue = value.substr(0, 4) + '年';
  returnValue += value.substr(5, 2) + '月';
  returnValue += value.substr(8, 2) + '日 ';
  return returnValue;
}

function setBlogsActivity(e) {
  var t = e.target || e.srcElement;
  $('.blogItem').removeClass('activity');
  while(!$(t).hasClass('blogItem')) {
    t = $(t).parent();
  }
  $(t).addClass('activity');
};

var BlogsItem = React.createClass({
	render: function() {
    if (this.props.data) {
      // console.log(this.props.data.length);
      var blogs = this.props.data.map(function (blog) {
        var handleClick = function(event) {
          // console.log(blog.Id);
          BlogBody.showBlogBody(blog);
          setBlogsActivity(event);
        };
        return (
    			<div key={blog.Id} className="blogItem" onClick={handleClick}>
          	<strong>{blog.Title}</strong>
    				<br/>
    				<br/>
    				{formatData(blog.PostDate)}
    				<div className="moreInfo">
    					<i className="fui-check-inverted">({blog.DiggCount})</i>
    					<i className="fui-new">({blog.CommentCount})</i>
    					<i className="fui-eye">({blog.ViewCount})</i>
    				</div>
    			</div>
        );
      });
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
    return (
      <div className="blogList">
        {blogs}
      </div>
    );
	}
});

module.exports = BlogsItem;
