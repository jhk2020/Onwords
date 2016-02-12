import React, { Component } from 'react';

export default class AnnotatorButton extends Component {
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
    return (
      <div onClick={this.handleClick} className='annotator-button-container'>
        <img className='annotator-button' src='https://cdn1.iconfinder.com/data/icons/education-set-5/512/dialogue-512.png' />
      </div>
    );
  }
};
