import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { snackAction } from '../store/actions/appActions';
import Spinner from './Spinner';

const styles = {
	loaderStyle: {
	  width: '30%',
	  maxWidth: 400,
	}
};

class AffiliateBars extends React.Component {

	constructor(props) {
		super(props);
	}

	handleRequestClose = () => {
		this.props.snackAction({shown: false});
	}

	render() {

		return (
			<div>
				<Dialog
	        modal={false}
	        open={this.props.loaderOpen}
	        contentStyle={styles.loaderStyle}
	        >
	        <Spinner/>{this.props.loaderTip}
	      </Dialog>
	      <Snackbar style={{bottom: 45}}
          open={this.props.snackOpen}
          message={this.props.snackTip}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
		);
	}
}

export default  connect(
  (state) => ({
      loaderOpen: state.app.get('loaderOpen'),
      loaderTip: state.app.get('loaderTip'),
      snackOpen: state.app.get('snackOpen'),
      snackTip: state.app.get('snackTip'),
  }),
  (dispatch) => (
	    bindActionCreators({
	      snackAction
	    }, dispatch)
	  )
)(AffiliateBars);