import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';

export default class MyFeedLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.goToUrl = this.goToUrl.bind(this);
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  goToUrl() {
    const win = window.open(this.props.linkInfo.uri_link, '_blank');
    win.focus();
  }

  render() {
    const {linkInfo} = this.props;
    return <div className='feedLink'>
      <div style={{display: 'flex', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'}}>
      <p className='redirectLink' onClick={this.goToUrl}>{linkInfo.title}</p>
      <img
          onClick={this.handleClick}
          src={chrome.extension.getURL(!this.state.open ? '/assets/down.png' : 'assets/up.png')}
          style={{width: '12px', height: 'auto', margin: 'auto 6px'}}
      />
      </div>
      { this.state.open ?
        <div className='feedLinkComment'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </div>
        : null
      }
      <Divider style={{marginTop: '10px'}}/>
    </div>
  }
}

export default MyFeedLink;
