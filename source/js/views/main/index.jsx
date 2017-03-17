import React, { Component , PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import SigninDialog from '../../components/Signin/SigninDialog';

const rootTheme = getMuiTheme(lightBaseTheme);

const styles = {

  header: {
    background: rootTheme.appBar.color,
  },
  footer: {
    background: rootTheme.appBar.color,
  }
};

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className="wrapper">
          <Paper  style={ styles.header } className="header">
            <HeaderBar/>
          </Paper>
          <div className="body">
            <div className="content">
              {this.props.children}
            </div>
          </div>
          <Paper style={ styles.footer } className="footer">
            <FooterBar/>
          </Paper>
          <SigninDialog/>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
