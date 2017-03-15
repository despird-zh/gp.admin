import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import IconButton from 'material-ui/IconButton';
/** icons */
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionOpenBrowser from 'material-ui/svg-icons/action/open-in-browser';
import ActionOpenNew from 'material-ui/svg-icons/action/open-in-new';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import HardwareSecurity from 'material-ui/svg-icons/hardware/security';

import Snackbar from 'material-ui/Snackbar';
import muiThemeable from 'material-ui/styles/muiThemeable';

injectTapEventPlugin();

function getStyles(props) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,
  } = props.muiTheme;

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      //backgroundColor: appBar.color,
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

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      open: false,
    };
    this.styles = getStyles(this.props);
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

  render() {

    const titleElement = React.createElement('h1', 
    {
      style: this.props.muiTheme.prepareStyles(Object.assign({}, this.styles.title, this.styles.mainElement)),
    }, 
    'Infinity Connection');

    const iconRightStyle = Object.assign({}, this.styles.iconButtonStyle, {
      marginRight: -16,
      marginLeft: 'auto',
    });

    return (
      <div style={this.styles.root} className="content">
        <IconButton style={this.styles.iconButtonStyle} iconStyle={this.styles.iconButtonIconStyle}>
          <NavigationMenu style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        {titleElement}
        <IconButton
          style={this.styles.iconButtonStyle}
          iconStyle={this.styles.iconButtonIconStyle}>
          <ActionExtension style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        <IconButton
          style={this.styles.iconButtonStyle}
          iconStyle={this.styles.iconButtonIconStyle}>
          <HardwareSecurity style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        <IconButton
          style={this.styles.iconButtonStyle}
          iconStyle={this.styles.iconButtonIconStyle}>
          <ActionSettings style={Object.assign({}, this.styles.iconButtonIconStyle)} />
        </IconButton>
        <IconButton
          style={iconRightStyle}
          iconStyle={this.styles.iconButtonIconStyle}
          onTouchTap={this.handleTouchTap}>
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
}


export default muiThemeable()(HeaderBar);