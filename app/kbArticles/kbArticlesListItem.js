'use strict';

var KbArticlesBody = require('./kbArticleBody');

function setKbArticlesActivity(e) {
  var t = e.target || e.srcElement;
  $('.kbArticlesItem').removeClass('activity');
  while(!$(t).hasClass('kbArticlesItem')) {
    t = $(t).parent();
  }
  $(t).addClass('activity');
};

var KbArticlesListItem = React.createClass({
	render: function() {
    if (this.props.data) {
      // console.log(this.props.data.length);
      var kbArticles = this.props.data.map(function (kbArticle) {
        var handleClick = function(event) {
          // console.log(kbArticle.Id);
          KbArticlesBody.showKbArticleBody(kbArticle);
          setKbArticlesActivity(event);
        };
        // console.log(kbArticle.Author);
        if (kbArticle.Author == "") {
          kbArticle.Author = '神秘人物= =！';
        }
        return (
    			<div key={kbArticle.Id} className="kbArticlesItem" onClick={handleClick}>
          	<strong>{kbArticle.Title}</strong>
    				<br/>
            {kbArticle.Author}
    				<div className="moreInfo">
    					<i className="fui-heart">({kbArticle.DiggCount})</i>
    					<i className="fui-eye">({kbArticle.ViewCount})</i>
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
      <div className="kbArticles">
        {kbArticles}
      </div>
    );
	}
});

module.exports = KbArticlesListItem;
