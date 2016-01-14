import React, { Component } from 'react';
import MyAnnotationsButton from './my-annotations-button';
import FriendAnnotationList from './annotationsList';
import FriendsCarousel from '../containers/FriendsCarouselContainer';

export default class AnnotatorView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    $(document).on('click', 'body', function(e) {
      if (e.target.className === 'annotator-button') {
        return;
      }
      // highlighter click check
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


  // componentWillReceiveProps(nextProps) {
  //   debugger;
  //   if (nextProps.annotations !== this.props.annotations) {
  //     var newFriends = {};
  //     var oldFriends = this.state.friendsShown;
  //     if (nextProps.annotations.length > 0) {
  //       for (var i = 0; i < nextProps.annotations.length; i++) {
  //         var user = nextProps.annotations[i].user_id;
  //         newFriends[user] = {shown: true, pic: oldFriends[user].pic, name: oldFriends[user].name};
  //       }
  //     }
  //
  //     for (var friend in oldFriends) {
  //       if (newFriends[friend] === undefined) {
  //         newFriends[friend] = {shown: false, pic: oldFriends[friend].pic, name: oldFriends[friend].name};
  //       }
  //     }
  //     this.setState({annotations: nextProps.annotations, friendsShown: newFriends});
  //   }
  // }


  componentWillUnmount() {
    $(document).off();
  }

  toggleFriendAnnotations(id) {
  //   debugger;
  //   var friends = this.state.friendsShown;
  //
  //   if (!friends[id].shown) {
      var ev = new CustomEvent('getFriendAnnotations', {detail: {userId: id}});
  //     document.dispatchEvent(ev);
  //   } else {
  //     var targetAnnotations = [];
  //     for (var i = 0; i < this.state.annotations.length; i++) {
  //       if (this.state.annotations[i].user_id.toString() === id) {
  //         targetAnnotations.push(this.state.annotations[i]);
  //       }
  //     }
      var ev = new CustomEvent('deleteRender', {detail: {
        targetAnnotations: targetAnnotations
      }});
  //     document.dispatchEvent(ev);
  //   }
  }

  render() {
    let {annotations} = this.props;
    return (
      <div className='friends-annotations-view-container'>
        <div className='friends-annotations-header'>
          <div className='friends-annotations-buttons-container'>
            <div className='annotations-title'>ANNOTATIONS</div>
            <MyAnnotationsButton />
          </div>

          <div className='friends-heading'>People You Follow</div>
            <FriendsCarousel />
        </div>
        <br></br>
          <div className='friends-annotations-list'>
            {annotations.length > 0 ? <FriendAnnotationList {...this.props} /> : null}
          </div>
      </div>
    );
  }

  // componentDidMount() {
    // var ownId = window.localStorage.getItem('user_id');
    // var uri = window.location.href.split("?")[0];
    // if (uri.substring(uri.length-11) === 'onwords1991') {
    //   uri = uri.substring(0, uri.length-13);
    // } else {
    //   uri = uri;
    // }
    //
    // var annotations = [];
    // var friendsShown = {};

    // Sort through other friends that have annotated the same page / friends whose annotations are showing
    // $.get('https://test2server.herokuapp.com/api/users/uri/annotations', {uri: uri, user_id: ownId})
    //   .done(function(data) {
    //     console.log(data);
    //     var oldAnnotations = this.props.annotations;
    //     if(oldAnnotations) {
    //       for (var i = 0; i < oldAnnotations.length; i++) {
    //         friendsShown[oldAnnotations[i].user_id] = { shown: true };
    //       }
    //       annotations = oldAnnotations;
    //     }
    //     for (var i = 0; i < data.length; i++) {
    //       if (friendsShown[data[i].id]) {
    //         friendsShown[data[i].id] = {shown: true, pic: data[i].pic_url, name: data[i].full_name};
    //       } else {
    //         friendsShown[data[i].id] = {shown: false, pic: data[i].pic_url, name: data[i].full_name};
    //       }
    //     }
    //     if (!friendsShown[ownId]) {
    //       friendsShown[ownId] = {shown: false};
    //     }
    //     this.setState({annotations: annotations, friendsShown: friendsShown});
    //   }.bind(this))

  // }
};
