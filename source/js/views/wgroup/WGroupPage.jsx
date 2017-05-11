import React from 'react';
import PropTypes from 'prop-types';

import ActDeviceHub from 'material-ui/svg-icons/hardware/device-hub';
import ActCaseHub from 'material-ui/svg-icons/hardware/cast';
import ActCastCntHub from 'material-ui/svg-icons/hardware/cast-connected';

import muiThemeable from 'material-ui/styles/muiThemeable';

import PageHeader from '../component/PageHeader';

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

  setVisible = (currentPage, pages) => {
    if (currentPage !== 'wgroupedit') {
      pages.wgroupedit.visible = false; // eslint-disable-line
    }
  }

  render() {
    return (
      <PageHeader
        pages={ allPages }
        router={ this.props.router }
        muiTheme={ this.props.muiTheme }
        setVisible={ this.setVisible }
      >
        { this.props.children }
      </PageHeader>
    );
  }
}

WGroupPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(WGroupPage);
