import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { testAction, testAsync } from '../store/actions/devActions';
import { snackAction, loaderAction } from '../store/actions/appActions';

import bookImg from '../../assets/img/book2.jpg';

class DevPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleAsyncButtonClick = this.handleAsyncButtonClick.bind(this);
    this.handleTestButtonClick = this.handleTestButtonClick.bind(this);
  }

  handleAsyncButtonClick() {
    this.props.testAsync();
  }

  handleTestButtonClick() {
    console.log(this.props);

    this.props.testAction();
  }

  handleLoaderTap = () => {
    this.props.loaderAction({
      shown: true,
      loaderTip: 'this is a loading, Please wait...',
    });
  }
  handleSnackTap = () => {
    this.props.snackAction({
      shown: true,
      snackTip: 'this is a snack message',
    });
  }
  render() {
    const {
      asyncData,
      asyncError,
      asyncLoading,
      counter,
    } = this.props;

    return (
      <div className='Dashboard'>
        <h2>Development <Link to='/about'>about</Link></h2>
        <hr />
        <div>
          <h3>Synchronous action</h3>
          <p>{counter}</p>
          <button onClick={ this.handleTestButtonClick }>
            Increase counter
          </button>
          <RaisedButton label='Loader' primary={ true } onTouchTap={ this.handleLoaderTap } />
          <RaisedButton label='Snack' primary={ true } onTouchTap={ this.handleSnackTap } />

        </div>
        <hr />
        <div>
          <h3>Async action example</h3>
          <p>{asyncData}</p>
          {asyncLoading && <p>Loading...</p>}
          {asyncError && <p>Error: { asyncError }</p>}
          <button
            disabled={ asyncLoading }
            onClick={ this.handleAsyncButtonClick }
          >
            Get async data
          </button>
        </div>
        <hr />
        <div>
          <h3>Background image</h3>
          <div className='BackgroundImgExample' />

          <h3>Image imported to the component</h3>
          <img src={ bookImg } alt='' className='ImgExample' />
        </div>
      </div>
    );
  }
}

DevPage.propTypes = {
  asyncData: PropTypes.string,
  asyncError: PropTypes.object,
  asyncLoading: PropTypes.bool,
  counter: PropTypes.number,
  loaderAction: PropTypes.func,
  snackAction: PropTypes.func,
  // from react-redux connect
  testAction: PropTypes.func,
  testAsync: PropTypes.func,
};

export default connect(
  (state) => ({
    asyncData: state.dev.get('asyncData'),
    asyncError: state.dev.get('asyncError'),
    asyncLoading: state.dev.get('asyncLoading'),
    counter: state.dev.get('counter'),
  }),
  (dispatch) => (
    bindActionCreators({
      testAction,
      testAsync,
      snackAction,
      loaderAction,
    }, dispatch)
  )
)(DevPage);
