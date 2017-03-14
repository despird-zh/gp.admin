import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className='App'>
        <AppBar title="My Appee   Bar" />
        <IndexLink to='/'>Home</IndexLink>
        {' | '}
        <Link to='/about'>About</Link>
        <br />
        <div className='Page'>
          {this.props.children}
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
