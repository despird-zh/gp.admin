import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ActionShop from 'material-ui/svg-icons/action/shop';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import ImgPhoto from 'material-ui/svg-icons/image/photo';
import DevStorage from 'material-ui/svg-icons/device/storage';
import AVLibBooks from 'material-ui/svg-icons/av/library-books';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { PageIconButton } from '../component/GPComponents';
import PageHeader from '../component/PageHeader';

const allPages = {
  dictlist: {
    path: '/master/dictlist',
    title: 'Dictionary Information',
    icon: <AVLibBooks />,
    description: 'System dictionary list',
    visible: true,
    disabled: false,
  },
  entitylist: {
    path: '/master/entitylist',
    title: 'Entities Information',
    icon: <ActionShop />,
    description: 'System entity list',
    visible: true,
    disabled: false,
  },
  imagelist: {
    path: '/master/imagelist',
    title: 'Image Information',
    icon: <ImgPhoto />,
    description: 'System image list',
    visible: true,
    disabled: false,
  },
  storagelist: {
    path: '/master/storagelist',
    title: 'Storage Information',
    icon: <DevStorage />,
    description: 'System storage list',
    visible: true,
    disabled: false,
  },
  orghier: {
    path: '/master/orghier',
    title: 'Org. Hierarchy',
    icon: <ActionExtension />,
    description: 'Organization Hierarchy',
    visible: true,
    disabled: false,
  },
};

class MasterPage extends React.Component {

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

MasterPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(MasterPage);
