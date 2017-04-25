import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ActionShop from 'material-ui/svg-icons/action/shop';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import ImgPhoto from 'material-ui/svg-icons/image/photo';
import DevStorage from 'material-ui/svg-icons/device/storage';
import AVLibBooks from 'material-ui/svg-icons/av/library-books';
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

MasterPage.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.object,
};

export default muiThemeable()(MasterPage);
