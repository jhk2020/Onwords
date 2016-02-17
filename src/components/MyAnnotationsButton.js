import React, { Component } from 'react';

export default class  MyAnnotationsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pic_url: 'http://frsports-bucket-0001.s3.amazonaws.com/wp-content/uploads/sites/6/2015/02/26224056/white-llama.jpg'
    }
  }
  componentWillMount() {
    chrome.storage.sync.get('user',function(data){
      this.setState({
        pic_url: data.user.picUrl
      });
    }.bind(this));
  }

  render() {
    return <div onClick={this.props.toggleMyFeed} className='myAnnotationsButton-container'>
      <img className='myAnnotationsButton' src={this.state.pic_url} />
    </div>
  }
}
