import React, { Component } from 'react';

export default class FriendsAnnotationComment extends Component {
  render() {
    const { friendInfo, annotation, checkSpotlight } = this.props;
    const clickHandler = function() {
      checkSpotlight(annotation);
    };

    const userColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');
    const divStyle = {
      borderLeft: '4px solid ' + userColor
    }

    return (
      <div onClick={clickHandler} className="annotation" style={divStyle}>
        <img className='annotation-friends-pic' src={friendInfo.pic} />
        <div className='annotation-text'>
          <p className='username'>{friendInfo.name}</p>
          <p>{annotation.text}</p>
        </div>
      </div>
    )
  }
};
