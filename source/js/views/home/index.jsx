import React, { Component } from 'react';

import spacing from 'material-ui/styles/spacing';
import HomeHero from './HomeHero';
import HomePurpose from './HomePurpose';
import HomeFeature from './HomeFeature';
import FullWidthSection from '../component/FullWidthSection';

class HomePage extends Component {

  render() {
    const style = {
      paddingTop: spacing.desktopKeylineIncrement,
    };

    return (
      <div style={ style }>
        <HomeHero />
        <HomePurpose />
        <FullWidthSection useContent={ true } contentStyle={ { maxWidth: 906 } }>
          <HomeFeature
            heading='Get Started'
            route='/get-started'
            img='assets/img/get-started.svg'
            firstChild={ true }
          />
          <HomeFeature
            heading='Customization'
            route='/customization'
            img='assets/img/css-framework.svg'
          />
          <HomeFeature
            heading='Components'
            route='/components'
            img='assets/img/components.svg'
            lastChild={ true }
          />
        </FullWidthSection>
      </div>
    );
  }
}

export default HomePage;
