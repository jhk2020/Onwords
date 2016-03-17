import React, { Component } from 'react';
import MyFeedLink from './MyFeedLink';

export default class MyFeed extends Component {
  constructor(props) {
    super(props);
    this.searchFeed = this.searchFeed.bind(this);
  }

  componentDidMount() {
    this.props.loadMyFeed();
  }

  componentWillUnmount() {
    this.props.toggleMyFeed(false);
  }

  searchFeed(e) {
    this.props.searchFeed(e.target.value);
  }

  render() {
    const { myFeedInfo } = this.props;
    const MyFeedList = myFeedInfo.concat(myFeedInfo.slice()).map(info => {
      return <MyFeedLink linkInfo={info} />
    });
    return <div className='feed' style={{maxHeight: $(window).height() - 40 + 'px'}}>
      {MyFeedList}
    </div>
  }
}
