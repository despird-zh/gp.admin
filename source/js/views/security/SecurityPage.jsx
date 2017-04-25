import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import SocialPeople from 'material-ui/svg-icons/social/people';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { PageIconButton } from '../../components/GPComponents';

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    root: {
      width: '100%',
    },
    container: {
      paddingTop: 10,
      width: '100%',
      display: 'flex',
      color: baseTheme.palette.textColor,
    },
    activeBtnIconStyle: {
      fill: baseTheme.palette.accent2Color,
      color: baseTheme.palette.accent2Color,
    },
    btnIconStyle: {
      fill: baseTheme.palette.primary2Color,
      color: baseTheme.palette.primary2Color,
    },
  };
}

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

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(this.props.muiTheme);
    this.state = {
      pages: [],
      currentPage: {},
    };
  }

  setCurrentPage = (pageName) => {
    let currentPage = null;
    let key;

    for (key of Object.keys(allPages)) {
      if (pageName === key) {
        allPages[key].disabled = true;
        allPages[key].visible = true;
        currentPage = allPages[key];
      } else {
        allPages[key].disabled = false;
        allPages[key].visible = true;
      }

      if (pageName !== 'useredit') {
        allPages.useredit.visible = false;
      }
    }

    const state = { pages: Object.values(allPages), currentPage };
    this.setState(state);
  }

  handleTouchJump = (pathinfo) => {
    this.props.router.push(pathinfo.path);
  }

  render() {
    const { currentPage, pages } = this.state;
    const buttons = pages.map((item) => {
      return (<PageIconButton
        key={ item.path }
        pageIcon={ item }
        styles={ this.styles }
        handleTouchJump={ this.handleTouchJump }
      />);
    });

    return (
      <div style={ this.styles.root }>
        <div style={ this.styles.container }>
          <h3 style={ { marginTop: 10, flex: 1 } }> { currentPage.title } <small>{ currentPage.description } </small></h3>
          <div>
            {buttons}
          </div>
        </div>
        <Divider />
        {this.props.children && React.cloneElement(this.props.children, {
          setCurrentPage: this.setCurrentPage,
          muiTheme: this.props.muiTheme,
        })}
      </div>
    );
  }
}

SecurityPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(SecurityPage);

