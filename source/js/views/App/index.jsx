import React, { Component , PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import HeaderBar from './HeaderBar';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
            <div className="box-content">
            1dp
            </div>
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
