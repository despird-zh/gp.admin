import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import { snackAction } from '../../store/actions/appActions';

const styles = {
  loaderStyle: {
    width: '30%',
    maxWidth: 350,
  },
};

class AffiliateBars extends React.Component {

  handleRequestClose = () => {
    this.props.snackAction({ shown: false });
  }

  render() {
    return (
      <div>
        <Dialog
          modal={ false }
          open={ this.props.loaderOpen }
          contentStyle={ styles.loaderStyle }
        >
          <FontIcon className='fa fa-spinner fa-spin fa-4x fa-fw' /> {this.props.loaderTip}
        </Dialog>
        <Snackbar
          style={ { bottom: 45 } }
          open={ this.props.snackOpen }
          message={ this.props.snackTip }
          autoHideDuration={ 4000 }
          onRequestClose={ this.handleRequestClose }
        />
      </div>
    );
  }
}

AffiliateBars.propTypes = {
  snackAction: PropTypes.func,
  loaderOpen: PropTypes.bool,
  loaderTip: PropTypes.string,
  snackTip: PropTypes.string,
  snackOpen: PropTypes.bool,
};
export default connect(
  (state) => ({
    loaderOpen: state.app.get('loaderOpen'),
    loaderTip: state.app.get('loaderTip'),
    snackOpen: state.app.get('snackOpen'),
    snackTip: state.app.get('snackTip'),
  }),
  (dispatch) => (
      bindActionCreators({
        snackAction,
      }, dispatch)
    )
)(AffiliateBars);
