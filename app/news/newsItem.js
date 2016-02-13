'use strict';

var NewsBody = require('./newsBody');

function setNewsActivity(e) {
  var t = e.target || e.srcElement;
  $('.newItem').removeClass('activity');
  while(!$(t).hasClass('newItem')) {
    t = $(t).parent();
  }
  $(t).addClass('activity');
};

var NewsItem = React.createClass({
	render: function() {
    if (this.props.data) {
      // console.log(this.props.data.length);
      var blogs = this.props.data.map(function (theNews) {
        var handleClick = function(event) {
          // console.log(theNews.Id);
          NewsBody.showNewsBody(theNews);
          setNewsActivity(event);
        };
        if (theNews.TopicIcon == 'http://pic.cnblogs.com/face/') {
          theNews.TopicIcon = './img/avatar.png';
        }
        return (
    			<div key={theNews.Id} className="newItem" onClick={handleClick}>
          	<strong>{theNews.Title}</strong>
    				<br/>
    				<br/>
            <img src={theNews.TopicIcon} className="img-rounded" />
    				<div className="moreInfo">
    					<i className="fui-check-inverted">({theNews.DiggCount})</i>
    					<i className="fui-new">({theNews.CommentCount})</i>
    					<i className="fui-eye">({theNews.ViewCount})</i>
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
      <div className="newList">
        {blogs}
      </div>
    );
	}
});

module.exports = NewsItem;
