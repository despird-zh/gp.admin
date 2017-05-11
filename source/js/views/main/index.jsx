import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import SigninDialog from '../component/Signin/SigninDialog';
import AffiliateBars from '../component/AffiliateBars';

const rootTheme = getMuiTheme(lightBaseTheme);

const styles = {

  header: {
    background: rootTheme.appBar.color,
  },
  footer: {
    background: rootTheme.appBar.color,
  },
};

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={ rootTheme }>
        <div className='wrapper'>
          <Paper style={ styles.header } className='header'>
            <HeaderBar />
          </Paper>
          <div className='body'>
            <div className='content'>
              {this.props.children}
            </div>
            <SigninDialog />
            <AffiliateBars />
          </div>
          <Paper style={ styles.footer } className='footer'>
            <FooterBar />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
