import React, { Component , PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';

const rootTheme = getMuiTheme(lightBaseTheme);
const styles = {
  header: {
    background: rootTheme.toolbar.backgroundColor,
  },
  footer: {
    background: lightBaseTheme.palette.accent2Color,
  }
};

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {


  render() {
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className="wrapper">
          <div  style={ styles.header } className="header">
            <div className="content">

            <AppBar
                title="Title"
              />
            <HeaderBar/>
            </div>
          </div>
          <div className="body">
            <div className="content">
              {this.props.children}
            </div>
          </div>
          <div style={ styles.header } className="footer">
            <FooterBar/>
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
