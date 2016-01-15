import React, { Component } from 'react';
import ReactAddons from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import MyAnnotationComment from './MyAnnotationComment';
import FriendsAnnotationComment from './FriendsAnnotationComment';


export default class AnnotationsList extends Component {
  constructor(props) {
    super(props);
  }

  deleteAnn(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  }

  // unhighlight() {
  //   var oldSpotlight = this.state.spotlight.id;
  //   var oldSpotlightColorWithUmph = $('span[data-annotation-id="' + oldSpotlight + '"]').css('background-color');
  //   if (oldSpotlightColorWithUmph) {
  //     var oldSpotlightColor = oldSpotlightColorWithUmph.slice(0, oldSpotlightColorWithUmph.length - 1) + ', 0.25)';
  //     var defaultColor = $('body').css('color');
  //     oldSpotlightColor = oldSpotlightColor.slice(0, oldSpotlightColor.indexOf('(')) + 'a' + oldSpotlightColor.slice(oldSpotlightColor.indexOf('('));
  //     var styles = {
  //       backgroundColor: oldSpotlightColor,
  //       color: defaultColor
  //     }
  //     $('span[data-annotation-id="' + oldSpotlight + '"]').css(styles);
  //   }
  // }
  //
  // highlight(annotation) {
  //   $('html, body').animate({
  //     scrollTop: annotation.offsetTop - 200
  //   }, 350);
  //
  //   var newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');
  //
  //   var newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
  //   var styles = {
  //     backgroundColor: newSpotlightColorWithUmph,
  //     color: "black"
  //   }
  //   $('span[data-annotation-id="' + annotation.id + '"]').css(styles);
  // }

  // clickHandler(annotation) {
  //   this.props.changeSpotlight(annotation);
  // }

  // componentWillMount() {
    // var newSpotlight = '';
    // if (this.props.spotlight !== '') {
    //   newSpotlight = this.props.spotlight;
    //   this.highlight(newSpotlight);
    // };
    // this.setState({annotations: this.props.annotations, spotlight: newSpotlight});
  // }

  // componentWillReceiveProps(nextProps) {
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
  // }

  componentWillUnmount() {
    // if (this.state.spotlight !== '') {
    //   this.unhighlight();
    //   this.props.changeSpotlight('');
    // }
    this.props.unmountSpotlight();
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
    let { userInfo, friends, annotations, checkSpotlight } = this.props;

    const annotationList = annotations.map(function(annotation, index) {
      let user = annotation.user_id;
        return (
          <div key={index}>
            <li className="annotationListItem">
              {user.toString() === ownId ?
                <MyAnnotationComment userInfo={userInfo} checkSpotlight={checkSpotlight} user={annotation.user_id} annotation={annotation} deleteAnn={this.deleteAnn} />
              : <FriendsAnnotationComment friendInfo = {friends[user]} checkSpotlight={checkSpotlight} user={annotation.user} annotation={annotation}/>
              }
            </li>
            <br></br>
          </div>
        )
    }.bind(this));


    return (
      <div className="annotationList">
        {annotationList}
      </div>
    )
  }
};
// <ReactCSSTransitionGroup transitionName='annotationList' transitionAppear={true} transitionEnterTimeout={100} transitionAppearTimeout={100}>
// </ReactCSSTransitionGroup>
