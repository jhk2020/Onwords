var React = require('react');

var AnnotatorHead = React.createClass({
  render: function() {
    return (
      <div className='annotator-head-container'>
        <div className='user-image-container'>
          <img src='http://frsports-bucket-0001.s3.amazonaws.com/wp-content/uploads/sites/6/2015/02/26224056/white-llama.jpg' className='annotator-user-image' />
        </div>
        
        <span>Jihoon Kim</span>
        <span>Hoonthegoon9000</span>
      </div>
    );
  }
});

module.exports = AnnotatorHead;
