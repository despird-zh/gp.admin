import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import { PageIconButton } from './GPComponents';

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

class PageHeader extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(this.props.muiTheme);
    this.state = {
      pages: [],
      buttons: undefined,
      currentPage: {},
    };
    this.allPages = props.pages;
  }

  setCurrentPage = (pageName, extinfo) => {
    let currentPage = null;
    let key;
    const ext = (extinfo) ? { ext: extinfo.title } : { ext: '' };
    for (key of Object.keys(this.allPages)) {
      if (pageName === key) {
        this.allPages[key].disabled = true;
        this.allPages[key].visible = true;
        this.allPages[key] = Object.assign(this.allPages[key], ext);
        currentPage = this.allPages[key];
      } else {
        this.allPages[key].disabled = false;
        this.allPages[key].visible = true;
      }
    }

    if (this.props.setVisible) this.props.setVisible(pageName, this.allPages);

    const buttons = (extinfo) ? extinfo.buttons : undefined;

    const state = { pages: Object.values(this.allPages), buttons, currentPage };
    this.setState(state);
  }

  handleTouchJump = (pathinfo) => {
    this.props.router.push(pathinfo.path);
  }

  render() {
    const { currentPage, pages } = this.state;
    let buttons = this.state.buttons;

    if (!buttons) {
      buttons = pages.map((item) => {
        return (item.visible ? <PageIconButton
          key={ item.path }
          pageIcon={ item }
          style={ !item.disabled ? this.styles.btnIconStyle : this.styles.activeBtnIconStyle }
          handleTouchJump={ this.handleTouchJump }
        /> : null);
      });
    }

    const title = (
        (currentPage.ext === '') ?
          (<h3 style={ this.styles.title }>
            { currentPage.title } <small>{ currentPage.description } </small>
          </h3>)
          :
          (<h3 style={ this.styles.title }>
            { currentPage.ext }
          </h3>)
      );

    return (
      <div style={ this.styles.root }>
        <div style={ this.styles.container }>
          { title }
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

PageHeader.propTypes = {
  muiTheme: PropTypes.object,
  router: PropTypes.object,
  setVisible: PropTypes.func,
  pages: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default PageHeader;
