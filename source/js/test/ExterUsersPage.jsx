import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { profileSaveAction } from '../../store/actions/configActions';
import API from '../../rpcapi';

const styles = {
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 },
}

class ExterUsersPage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }
  
  render() {

    let profile = this.props.profile;

  	return (
		  <div>
       external users
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  ExterUsersPage, 
  (state) => ({
            profile: state.config.get('profile'),
          }), 
  {profileSaveAction});

export default muiThemeable()(NewComponent);