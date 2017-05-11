import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import typography from 'material-ui/styles/typography';
import { grey200 } from 'material-ui/styles/colors';
import FullWidthSection from '../component/FullWidthSection';

const styles = {
  root: {
    backgroundColor: grey200,
  },
  content: {
    maxWidth: 700,
    padding: 0,
    margin: '0 auto',
    fontWeight: typography.fontWeightLight,
    fontSize: 20,
    lineHeight: '28px',
    paddingTop: 19,
    marginBottom: 13,
    letterSpacing: 0,
    color: typography.textDarkBlack,
  },
};

class HomePurpose extends Component {

  render() {
    return (
      <FullWidthSection
        style={ styles.root }
        useContent={ true }
        contentStyle={ styles.content }
        contentType='p'
        className='home-purpose'
      >
        Material-UI came about from our love of&nbsp;
        <a href='http://facebook.github.io/react/'>React</a> and&nbsp;
        <a href='https://www.google.com/design/spec/material-design/introduction.html'>
          { 'Google\'s Material Design '}
        </a>. {'We\'re currently using it on a project at&nbsp;'}
        <a href='https://www.call-em-all.com/Careers'>Call-Em-All</a> and plan on adding to it
        and making it better in the coming months.
      </FullWidthSection>
    );
  }
}

export default withWidth()(HomePurpose);
