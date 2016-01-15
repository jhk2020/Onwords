import React, { Component } from 'react';

export default class MyAnnotationComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldEditComment: false
    }
  }

  editComment() {
    this.setState({shouldEditComment: true});
  }

  submitChange(e) {
    e.preventDefault();
    var newText = $('textArea#annotationEdit').val();
    var annotation = this.props.annotation;
    annotation.text = newText;
    var ev = new CustomEvent('updateAnnotation', {detail: {targetAnnotation: annotation}})
    document.dispatchEvent(ev);
    this.setState({shouldEditComment: false});
  }


  render() {
    const { userInfo, annotation, checkSpotlight, deleteAnn } = this.props;

    var userColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');
    var divStyle = {
      borderLeft: '4px solid ' + userColor
    };

    var checkSpotlightOnClick = function(e) {
      if (e.target.className !== 'comment-delete-button') {
        checkSpotlight(annotation);
      }
    };

    var deleteOnClick = function(e) {
      e.stopPropagation();
      deleteAnn(annotation);
    };

    return (
      <div onClick={checkSpotlightOnClick} className="annotation" style={divStyle}>
        <img className='annotation-friends-pic' src={userInfo.pic} />
        <p className='username'> Me </p>
        {!this.state.shouldEditComment ? <p className='annotation-text'>{annotation.text}</p> :
          <form>
            <textArea id="annotationEdit" style={{height: 100+"px", width: 300+"px"}}>
              {annotation.text}
            </textArea>
            <button className='comment-submit-button' onClick={this.submitChange}>Submit</button>
          </form>
        }
        <div className='modify-comment-container'>
          <button className='comment-delete-button' onClick={deleteOnClick}>Remove</button>
          <button className='comment-edit-button' onClick={this.editComment}>Edit</button>
        </div>
      </div>
    )
  }
};
