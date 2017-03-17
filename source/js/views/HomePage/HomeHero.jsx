import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';
import { openSigninAction } from '../../store/actions/authActions';
import FullWidthSection from '../../components/FullWidthSection';

import bookImg from '../../../assets/img/book2.jpg';

const styles = {
  root: {
    backgroundColor: cyan500,
    overflow: 'hidden',
  },
  svgLogo: {
    marginLeft: 1060 * 0.5 - 210, //window.innerWidth * 0.5 - 130,
    width: 420,
    height: 157,
  },
  tagline: {
    margin: '16px auto 0 auto',
    textAlign: 'center',
    maxWidth: 575,
  },
  label: {
    color: lightBaseTheme.palette.primary1Color,
  },
  githubStyle: {
    margin: '16px 32px 0px 8px',
  },
  demoStyle: {
    margin: '16px 32px 0px 32px',
  },
  h1: {
    color: darkWhite,
    fontWeight: typography.fontWeightLight,
  },
  h2: {
    fontSize: 20,
    lineHeight: '28px',
    paddingTop: 19,
    marginBottom: 13,
    letterSpacing: 0,
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  taglineWhenLarge: {
    marginTop: 32,
  },
  h1WhenLarge: {
    fontSize: 56,
  },
  h2WhenLarge: {
    fontSize: 24,
    lineHeight: '32px',
    paddingTop: 16,
    marginBottom: 12,
  },
};


class HomeHero extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  };

  handleSignin = () => {
    this.props.openSigninAction(true);
  };
  handleSignup = () => {
    console.log('-=sdfadf');
  };

	render() {

    styles.h2 = Object.assign({}, styles.h1, styles.h2);

    if (this.props.width === LARGE) {
      styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge);
      styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge);
      styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge);
    }

		return (
      
      <FullWidthSection useContent={true} style={styles.root}>
        <img style={styles.svgLogo} src={ bookImg } />
        <div style={styles.tagline}>
          <h1 style={styles.h1}>Material-UI</h1>
          <h2 style={styles.h2}>
            A Set of React Components <span style={styles.nowrap}>
            that Implement</span> <span style={styles.nowrap}>
            Google&apos;s Material Design</span>
          </h2>
          { this.props.authenticated ? '':
          <RaisedButton
            className="demo-button"
            label="Signin"
            onTouchTap={this.handleSignin}
            style={styles.demoStyle}
            labelStyle={styles.label}
          />
          }
          <RaisedButton
            className="demo-button"
            label="Signup"
            onTouchTap={this.handleSignup}
            style={styles.demoStyle}
            labelStyle={styles.label}
          />
        </div>
      </FullWidthSection>
    );
	}
}
HomeHero.propTypes = {
  authenticated: PropTypes.bool,
  openSigninAction: PropTypes.func,
};
export default connect(
  (state) => ({
    authenticated: state.auth.get('authenticated'),
  }),
  (dispatch) => (
    bindActionCreators({
      openSigninAction,
    }, dispatch)
  )
)(withWidth()(HomeHero));