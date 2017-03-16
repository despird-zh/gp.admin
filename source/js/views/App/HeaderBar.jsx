import React , { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
/** icons */
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionOpenBrowser from 'material-ui/svg-icons/action/open-in-browser';
import ActionOpenNew from 'material-ui/svg-icons/action/open-in-new';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import HardwareSecurity from 'material-ui/svg-icons/hardware/security';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { openSigninAction } from '../../store/actions/authActions';

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
    };

    //console.log(context);
    this.styles = getStyles(this.props.muiTheme);
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleSignin = () => {
    this.props.openSigninAction(true);
  };

  handleTouchJump = () => {
    browserHistory.push('/about');
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
        <IconButton style={this.styles.iconButtonStyle} iconStyle={this.styles.iconButtonIconStyle}>
          <NavigationMenu style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        {titleElement}
        <IconButton
          style={iconRightFirstStyle}
          iconStyle={this.styles.iconButtonIconStyle}>
          <ActionExtension style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        <IconButton
          style={this.styles.iconButtonStyle}
          iconStyle={this.styles.iconButtonIconStyle}
          onTouchTap={this.handleTouchTap}>
          <HardwareSecurity style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        <IconButton
          style={this.styles.iconButtonStyle}
          iconStyle={this.styles.iconButtonIconStyle}
          onTouchTap={this.handleTouchJump}>
          <ActionSettings style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        <IconButton
          style={iconRightLastStyle}
          iconStyle={this.styles.iconButtonIconStyle}
          onTouchTap={this.handleSignin}>
          <ActionOpenBrowser style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        
         <Snackbar style={{bottom: 45}}
          open={this.state.open}
          message="Event added to your calendar"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
};

HeaderBar.propTypes = {
  openSigninAction: PropTypes.func,
};
export default connect(
  (state) => ({}),
  (dispatch) => (
    bindActionCreators({
      openSigninAction,
    }, dispatch)
  )
)(muiThemeable()(HeaderBar));
//export default muiThemeable()(HeaderBar);

