import React from 'react';
import { Link } from 'react-router';

import AuthConnect from '../../components/AuthConnect';

class WGroupEditPage extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      errtips: {},
      avatar: 'assets/img/book2.jpg',
      content: 'member',
    };
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('wgroupedit');
  }

  render() {
    return (
      <div>
        <h2 className='alt-header'>About <Link to="/">home</Link></h2>
        <p>
          This example app is part of the <a href='https://github.com/coryhouse/react-slingshot'>React-Slingshot
          starter kit</a>.
        </p>
        <p>
          <Link to='/badlink'>Click this bad link</Link> to see the 404 page.
        </p>
      </div>
    );
  }
}

export default WGroupEditPage;