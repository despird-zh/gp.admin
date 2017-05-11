import React from 'react';
import PropTypes from 'prop-types';

import AVAlbum from 'material-ui/svg-icons/av/album';
import AVSmtRecord from 'material-ui/svg-icons/av/fiber-smart-record';
import muiThemeable from 'material-ui/styles/muiThemeable';

import PageHeader from '../component/PageHeader';

const allPages = {
  useraudit: {
    path: '/audit/useraudit',
    title: 'System Profile',
    icon: <AVAlbum />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
  },
  wgroupaudit: {
    path: '/audit/wgroupaudit',
    title: 'System Settings',
    icon: <AVSmtRecord />,
    description: 'Review the settings of System',
    visible: true,
    disabled: false,
  },
};

class AuditPage extends React.Component {

  render() {
    return (
      <PageHeader
        pages={ allPages }
        router={ this.props.router }
        muiTheme={ this.props.muiTheme }
      >
        { this.props.children }
      </PageHeader>
    );
  }
}

AuditPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};
export default muiThemeable()(AuditPage);
