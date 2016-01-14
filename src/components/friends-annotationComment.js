import React, { Component } from 'react';

export default class friendAnnotationComment extends Component {
  render() {
    const { friendInfo, annotation } = this.props;
    const username = friendInfo.username;
    const userpic = friendInfo.userpic;

    var self = this;

    var clickHandler = function() {
      self.props.clickHandler(annotation);
    };

    var userColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');

    var divStyle = {
      borderLeft: '4px solid ' + userColor
    }

    return (
      <div onClick={clickHandler} className="annotation" style={divStyle}>
        <img className='annotation-friends-pic' src={userpic} />
        <div className='annotation-text'>
          <p className='username'>{username}</p>
          <p>{annotation.text}</p>
        </div>
      </div>
    )
  }
};
