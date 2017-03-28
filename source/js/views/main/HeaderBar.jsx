import React , { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
/** icons */
import ActionHomeMenu from 'material-ui/svg-icons/action/home';
import ActionOpenBrowser from 'material-ui/svg-icons/action/open-in-browser';
import ActionOpenNew from 'material-ui/svg-icons/action/open-in-new';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import ActionTrackChgs from 'material-ui/svg-icons/action/track-changes';
import ActionLaunch from 'material-ui/svg-icons/action/launch';

import HardwareSecurity from 'material-ui/svg-icons/hardware/security';
import HardwareDvcHub from 'material-ui/svg-icons/hardware/device-hub';

import DeviceWidgets from 'material-ui/svg-icons/device/widgets';

import { hashHistory } from 'react-router';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { openSigninAction, signoffAction } from '../../store/actions/authActions';

injectTapEventPlugin();

function getStyles(muiTheme) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,

  } = muiTheme;

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: `${appBar.height}px`,
    },
    mainElement: {
      boxFlex: 1,
      flex: '1',
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16,
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor,
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1,
    },
  };

  return styles;
}

class HeaderBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 3,
      open: false,
      wgroup: false,
      wgroup_anchor: null,
    };

    //console.log(context);
    this.styles = getStyles(this.props.muiTheme);
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleSignin = () => {
    this.props.openSigninAction(true);
  };

  handleSignoff = () => {
    this.props.signoffAction(true);
  };

  handleTouchJump = (path) => {
    hashHistory.push(path);
  };

  handlePopMenu = (type, event) => {
    // This prevents ghost click.
    event.preventDefault();
    let newstate = Object.assign(this.state, {
      wgroup: true,
      wgroup_anchor: event.currentTarget,
    });

    this.setState(newstate);
  };

  handlePopMenuClose = (type) => {
    event.preventDefault();
    let newstate = Object.assign(this.state, {
      wgroup: false,
    });

    this.setState(newstate);
  };

  render() {

    const titleElement = React.createElement('h1', 
    {
      style: this.props.muiTheme.prepareStyles(Object.assign({}, this.styles.title, this.styles.mainElement)),
    }, 
    'Infinity Connection');

    const iconRightLastStyle = Object.assign({}, this.styles.iconButtonStyle, {
      marginRight: -16,
    });

    const iconRightFirstStyle = Object.assign({}, this.styles.iconButtonStyle, {
      marginLeft: 'auto',
    });

    return (

      <div style={this.styles.root} className="content">
        <IconButton style={this.styles.iconButtonStyle} 
          iconStyle={this.styles.iconButtonIconStyle}
          onTouchTap={this.handleTouchJump.bind(this, '/')}
          >
          <ActionHomeMenu style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        {titleElement}
        { !this.props.authenticated ? null :
          <IconButton
            style={iconRightFirstStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleTouchJump.bind(this, '/audit')}
            ref="wgroup">
            <ActionTrackChgs style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
        }
        { !this.props.authenticated ? null :
          <IconButton
            style={this.styles.iconButtonStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleTouchJump.bind(this, '/master')}
            ref="wgroup">
            <DeviceWidgets style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
        }
        { !this.props.authenticated ? null :
          <IconButton
            style={this.styles.iconButtonStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleTouchJump.bind(this, '/wgroup')}
            ref="wgroup">
            <HardwareDvcHub style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
        }
        { !this.props.authenticated ? null :
          <IconButton
            style={this.styles.iconButtonStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleTouchJump.bind(this, '/security')}>
            <HardwareSecurity style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
        }
        { !this.props.authenticated ? null :
          <IconButton
            style={this.styles.iconButtonStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleTouchJump.bind(this, '/config')}>
            <ActionSettings style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
        }
        { this.props.authenticated ? 
          <IconButton
            style={iconRightLastStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleSignoff}>
            <ActionLaunch style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
         :
          <IconButton
            style={iconRightLastStyle}
            iconStyle={this.styles.iconButtonIconStyle}
            onTouchTap={this.handleSignin}>
            <ActionOpenBrowser style={Object.assign({}, this.styles.iconButtonIconStyle)} />
          </IconButton>
        }
      </div>
    );
  }
};

HeaderBar.propTypes = {
  openSigninAction: PropTypes.func,
};
export default connect(
  (state) => ({
    authenticated: state.auth.get('authenticated'),
    account: state.auth.get('account')
  }),
  (dispatch) => (
    bindActionCreators({
      openSigninAction, signoffAction
    }, dispatch)
  )
)(muiThemeable()(HeaderBar));
