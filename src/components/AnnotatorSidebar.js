import React, { Component } from 'react';
import MyAnnotationsButton from './MyAnnotationsButton';
import AnnotationsList from '../containers/AnnotationsListContainer';
import FriendsCarousel from '../containers/FriendsCarouselContainer';
import MyFeed from '../containers/MyFeedContainer';
import Paper from 'material-ui/lib/paper';

export default class AnnotatorSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOn: false
    }
    this.searchFeed = this.searchFeed.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }
  componentWillMount() {
    $(document).on('click', 'body', function(e) {
      if (e.target.className === 'annotator-icon') {
        return;
      }
      if(getSelection().toString()) {
        return;
      }
      if($(e.target).attr('data-reactid')) {
        e.preventDefault();
        return;
      }
      if($(e.target).is('[class^="annotator-"]') || $(e.target).is('[id^="annotator-"]')) {
          e.preventDefault();
          return;
      }
      this.props.updateView();
    }.bind(this));
  }

  componentWillUnmount() {
    $(document).off();
  }

  searchFeed(e) {
    this.props.searchFeed(e.target.value);
  }

  toggleSearch() {
    this.setState({
      searchOn: !this.state.searchOn
    }, () => {
      if (this.state.searchOn) {
        document.getElementById('feed-search').focus();
      }
    })
  }

  render() {
    const {annotations, toggleMyFeed, searchFeed, myFeedShown} = this.props;
    return <div className='friends-annotations-view-container'>
      <Paper className='friends-annotations-header' zDepth={2}>
        <div className='friends-annotations-buttons-container'>
          {myFeedShown ?
            <div className='feed-search-container'>
              <img className='feed-search-icon' onClick={this.toggleSearch} src={chrome.extension.getURL('/assets/search.png')} />
              {this.state.searchOn ? <input id='feed-search' type='text' onChange={this.searchFeed}/> : null}
            </div>
            : null
          }
          <div className='annotations-title'>{!this.state.searchOn ? 'ONWORDS' : null}</div>
          <MyAnnotationsButton toggleMyFeed={toggleMyFeed}/>
        </div>
        {!myFeedShown ?
          <div>
            <div className='friends-heading'>People You Follow</div>
            <FriendsCarousel />
          </div>
          : <MyFeed toggleMyFeed={toggleMyFeed} searchFeed={searchFeed} />
        }
      </Paper>
      <br/>
      {!myFeedShown ?
        <div className='friends-annotations-list'>
          <AnnotationsList />
        </div>
        : null
      }
    </div>
  }
};
