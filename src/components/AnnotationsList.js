import React, { Component } from 'react';
import MyAnnotationComment from './MyAnnotationComment';
import FriendsAnnotationComment from './FriendsAnnotationComment';

export default class AnnotationsList extends Component {
  componentWillUnmount() {
    this.props.unmountSpotlight();
  }

  deleteAnn(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  }

  render() {
    const ownId = window.localStorage.getItem('user_id');
    const { userInfo, friends, annotations, checkSpotlight } = this.props;

    const annotationList = annotations.map(function(annotation, index) {
      let user = annotation.user_id;
        return <div key={index}>
          <li className="annotationListItem">
            {user.toString() === ownId ?
              <MyAnnotationComment
                  annotation={annotation}
                  deleteAnn={this.deleteAnn}
                  checkSpotlight={checkSpotlight}
                  user={annotation.user_id}
                  userInfo={userInfo}
              />
            : <FriendsAnnotationComment
                  annotation={annotation}
                  checkSpotlight={checkSpotlight}
                  friendInfo = {friends[user]}
                  user={annotation.user}
              />
            }
          </li>
          <br></br>
        </div>
    }.bind(this));


    return (
      <div className="annotationList">
        {annotationList}
      </div>
    )
  }
};
