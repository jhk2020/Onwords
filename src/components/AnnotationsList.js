import React, { Component } from 'react';
import ReactAddons from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import AnnotationComment from './annotationComment';
import FriendAnnotationComment from './friends-annotationComment';


export default class AnnotationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotlight: '',
      userInfo: {}
    }
  }

  deleteAnn(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  }

  unhighlight() {
    var oldSpotlight = this.state.spotlight.id;
    var oldSpotlightColorWithUmph = $('span[data-annotation-id="' + oldSpotlight + '"]').css('background-color');
    if (oldSpotlightColorWithUmph) {
      var oldSpotlightColor = oldSpotlightColorWithUmph.slice(0, oldSpotlightColorWithUmph.length - 1) + ', 0.25)';
      var defaultColor = $('body').css('color');
      oldSpotlightColor = oldSpotlightColor.slice(0, oldSpotlightColor.indexOf('(')) + 'a' + oldSpotlightColor.slice(oldSpotlightColor.indexOf('('));
      var styles = {
        backgroundColor: oldSpotlightColor,
        color: defaultColor
      }
      $('span[data-annotation-id="' + oldSpotlight + '"]').css(styles);
    }
  }

  highlight(annotation) {
    $('html, body').animate({
      scrollTop: annotation.offsetTop - 200
    }, 350);

    var newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');

    var newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
    var styles = {
      backgroundColor: newSpotlightColorWithUmph,
      color: "black"
    }
    $('span[data-annotation-id="' + annotation.id + '"]').css(styles);
  }

  clickHandler(annotation) {
    this.props.changeSpotlight(annotation);
  }

  componentWillMount() {
    // var newSpotlight = '';
    // if (this.props.spotlight !== '') {
    //   newSpotlight = this.props.spotlight;
    //   this.highlight(newSpotlight);
    // };
    // this.setState({annotations: this.props.annotations, spotlight: newSpotlight});
  }

  componentWillReceiveProps(nextProps) {
  //
  //   if (nextProps.spotlight !== this.state.spotlight) {
  //     if (this.state.spotlight !== '') {
  //       this.unhighlight();
  //     }
  //     if (nextProps.spotlight !== '') {
  //       this.highlight(nextProps.spotlight);
  //     }
  //
  //   }
  //   this.setState({annotations: nextProps.annotations, spotlight: nextProps.spotlight});
  }

  componentWillUnmount() {
    if (this.state.spotlight !== '') {
      this.unhighlight();
      this.props.changeSpotlight('');
    }
  }

  componentDidMount () {
    // chrome.storage.sync.get('user',function(data){
    //   var info = {
    //     pic_url: data.user.picUrl,
    //     username: data.user.fullName,
    //     description: data.user.description || 'OnWords  !!  '
    //   }
    //   this.setState({userInfo: info});
    // }.bind(this));
  }

  render() {
    var ownId = window.localStorage.getItem('user_id');
    let { userInfo, friends, annotations } = this.props;
    console.log(userInfo)

    var annotationList = annotations.map(function(annotation, index) {
      var user = annotation.user_id;
        // if (friends[user]) {
          // console.log('friend is', friends[user]);
          return (
            <div key={index}>
              <li className="annotationListItem">
                {user.toString() === ownId ?
                  <AnnotationComment userInfo={userInfo} clickHandler={this.clickHandler} user={annotation.user_id} annotation={annotation} deleteAnn={this.deleteAnn} />
                : <FriendAnnotationComment friendInfo = {friends[user]} spotlight={this.state.spotlight} clickHandler={this.clickHandler} user={annotation.user} annotation={annotation}/>
                }
              </li>
              <br></br>
            </div>
          )
        // }
    }.bind(this));


    return (
        <ReactCSSTransitionGroup transitionName='annotationList' transitionAppear={true} transitionAppearTimeout={100}>
          <div className="annotationList">
            {annotationList}
          </div>
        </ReactCSSTransitionGroup>
    )
  }
};
