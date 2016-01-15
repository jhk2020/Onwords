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

  componentWillUnmount() {
    this.props.unmountSpotlight();
  }
};
// <ReactCSSTransitionGroup transitionName='annotationList' transitionAppear={true} transitionEnterTimeout={100} transitionAppearTimeout={100}>
// </ReactCSSTransitionGroup>
