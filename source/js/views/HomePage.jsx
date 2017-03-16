import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction, testAsync } from '../store/actions/homeActions';
import { Link } from 'react-router';
import bookImg from '../../assets/img/book2.jpg';

class HomePage extends Component {

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

  render() {
    const {
      asyncData,
      asyncError,
      asyncLoading,
      counter,
    } = this.props;

    return (
      <div className='Dashboard'>
        <h2>Examples <Link to="/about">about</Link></h2>
        <hr />
        <div>
          <h3>Synchronous action</h3>
          <p>{counter}</p>
          <button onClick={ this.handleTestButtonClick }>
            Increase counter
          </button>
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

HomePage.propTypes = {
  asyncData: PropTypes.string,
  asyncError: PropTypes.object,
  asyncLoading: PropTypes.bool,
  counter: PropTypes.number,
  // from react-redux connect
  testAction: PropTypes.func,
  testAsync: PropTypes.func,
};

export default connect(
  (state) => ({
    asyncData: state.home.get('asyncData'),
    asyncError: state.home.get('asyncError'),
    asyncLoading: state.home.get('asyncLoading'),
    counter: state.home.get('counter'),
  }),
  (dispatch) => (
    bindActionCreators({
      testAction,
      testAsync,
    }, dispatch)
  )
)(HomePage);
