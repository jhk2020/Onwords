import React, { Component } from 'react';
import MyFeedLink from './MyFeedLink';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export default class MyFeed extends Component {
  componentDidMount() {
    this.props.loadMyFeed();
  }
  componentWillUnmount() {
    this.props.toggleMyFeed(false);
  }
  render() {
    const { myFeedInfo } = this.props;
    const MyFeedList = myFeedInfo.map(info => {
      return <MyFeedLink linkInfo={info} />
    });
    return <div className='feed' style={{maxHeight: $(window).height() - 40 + 'px'}}>
      {MyFeedList}
      <Card>
        <CardHeader
          title="Without Avatar"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Action1"/>
          <FlatButton label="Action2"/>
        </CardActions>
      </Card>
    </div>
  }
}
