import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ActionShop from 'material-ui/svg-icons/action/shop';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { PageIconButton } from '../component/GPComponents';
import PageHeader from '../component/PageHeader';

const allPages = {
  profile: {
    path: '/config/profile',
    title: 'System Profile',
    icon: <ActionShop />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
  },
  settings: {
    path: '/config/setting',
    title: 'System Settings',
    icon: <ActionSettings />,
    description: 'Review the settings of System',
    visible: true,
    disabled: false,
  },
};

class ConfigPage extends React.Component {

  render() {

    return (
        <PageHeader
          pages = { allPages }
          router = { this.props.router }
          muiTheme = { this.props.muiTheme }
        >
          { this.props.children }
        </PageHeader>
    );
  }
}

ConfigPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};
export default muiThemeable()(ConfigPage);
