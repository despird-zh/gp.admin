import React, { Component } from 'react';
import { Link } from 'react-router';
import spacing from 'material-ui/styles/spacing';
import HomeHero from './HomeHero';

class HomePage extends Component {

  render() {
    const style = {
      paddingTop: spacing.desktopKeylineIncrement,
    };

    return (
      <div style={style}>
        <HomeHero/>
      </div>
    );
  }
}

export default HomePage;