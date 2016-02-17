import React, { Component } from 'react';

export default class AnnotatorIcon extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    setTimeout(function() {
      this.props.updateView();
    }.bind(this), 130);
  }

  render() {
    return <div onClick={this.handleClick} className='annotator-icon-container'>
      <img className='annotator-icon' src='https://cdn1.iconfinder.com/data/icons/education-set-5/512/dialogue-512.png' />
    </div>
  }
};
