import React, { Component , PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="wrapper">
          <div className="header">
            <div className="box-content">
            <HeaderBar/>
            </div>
          </div>
          <div className="content">
            <div className="box-content">
              {this.props.children}
            </div>
          </div>
          <div className="footer">
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
