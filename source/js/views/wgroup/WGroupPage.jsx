import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ActDeviceHub from 'material-ui/svg-icons/hardware/device-hub';
import ActCaseHub from 'material-ui/svg-icons/hardware/cast';
import ActCastCntHub from 'material-ui/svg-icons/hardware/cast-connected';

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
    title: {
      marginTop: 10,
      flex: 1,
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
  wgroupadd: {
    path: '/wgroup/wgroupadd/',
    title: 'Workgroup Add',
    icon: <ActCastCntHub />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
  },
  wgroupedit: {
    path: '/wgroup/wgroupedit/',
    title: 'Workgroup Edit',
    icon: <ActCaseHub />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
  },
  wgrouplist: {
    path: '/wgroup/wgrouplist',
    title: 'Workgroup List',
    icon: <ActDeviceHub />,
    description: 'Review the settings of System',
    visible: true,
    disabled: false,
  },
};

class WGroupPage extends React.Component {

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
    }
    if (pageName !== 'wgroupedit') {
      allPages.wgroupedit.visible = false;
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
          <h3 style={ this.styles.title }>
            { currentPage.title } <small>{ currentPage.description } </small>
          </h3>
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

WGroupPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(WGroupPage);
