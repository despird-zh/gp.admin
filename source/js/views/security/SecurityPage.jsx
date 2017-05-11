import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import SocialPeople from 'material-ui/svg-icons/social/people';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { PageIconButton } from '../component/GPComponents';
import PageHeader from '../component/PageHeader';

const allPages = {
  userlist: {
    path: '/security/userlist',
    title: 'Internal Users',
    icon: <SocialPeople />,
    description: 'The internal users list',
    visible: true,
    disabled: false,
  },
  useradd: {
    path: '/security/useradd',
    title: 'Add User',
    icon: <SocialPersonAdd />,
    description: 'Add new user information',
    visible: true,
    disabled: false,
  },
  useredit: {
    path: '/security/userinfo/',
    title: 'Edit User',
    icon: <SocialPerson />,
    description: 'Edit user information',
    visible: true,
    disabled: false,
  },
};

class SecurityPage extends React.Component {

  setVisible = (currentPage, allPages) => {
    if(currentPage !== 'userinfo')
      allPages['userinfo'].visible = false;
  }
  
  render() {

    return (
        <PageHeader
          pages = { allPages }
          router = { this.props.router }
          muiTheme = { this.props.muiTheme }
          setVisible = { this.setVisible }
        >
          { this.props.children }
        </PageHeader>
    );
  }
}

SecurityPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(SecurityPage);

