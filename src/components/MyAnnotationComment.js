import React, { Component } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';

export default class MyAnnotationComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldEditComment: false,
      textAreaComment: props.annotation.text
    }
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.editComment = this.editComment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  deleteOnClick(e) {
    e.stopPropagation();
    this.props.deleteAnn(this.props.annotation);
  }

  editComment() {
    this.setState({shouldEditComment: true});
  }

  onChange(e) {
    this.setState({textAreaComment: e.target.value})
  }

  submitChange(e) {
    e.preventDefault();
    var newText = $('textArea#annotationEdit').val();
    let { annotation } = this.props;
    annotation.text = newText;
    var ev = new CustomEvent('updateAnnotation', {detail: {targetAnnotation: annotation}})
    document.dispatchEvent(ev);
    this.setState({shouldEditComment: false});
  }

  render() {
    const { userInfo, annotation, checkSpotlight, deleteAnn } = this.props;

    const userColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');
    const divStyle = {
      borderLeft: '4px solid ' + userColor
    };

    const checkSpotlightOnClick = function(e) {
      if (e.target.className === 'comment-delete-button' || e.target.className === 'comment-edit-button') {
        return;
      }
      checkSpotlight(annotation);
    };

    return <Paper className="annotation" onClick={checkSpotlightOnClick} style={divStyle} zDepth={2}>
      <img className='annotation-friends-pic' src={userInfo.pic} />
      <p className='username'> Me </p>
      {!this.state.shouldEditComment ? <p className='annotation-text'>{annotation.text}</p> :
        <form>
          <textArea
              id="annotationEdit"
              onChange={this.onChange}
              style={{height: "100px", width: "300px"}}
              value={this.state.textAreaComment}
          />
          <button className='comment-submit-button' onClick={this.submitChange}>Submit</button>
        </form>
      }
      <div className='modify-comment-container'>
        <FlatButton
            className='comment-delete-button'
            label='Delete'
            onClick={this.deleteOnClick}
            style={{fontSize: '11px', lineHeight: '20px', minWidth: '50px'}}
        />
        <FlatButton
            className='comment-edit-button'
            label='Edit'
            onClick={this.editComment}
            style={{fontSize: '11px', lineHeight: '20px', minWidth: '50px'}}
        />
      </div>
    </Paper>
  }
};
