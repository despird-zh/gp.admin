import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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

class InterUsersPage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }
  

  render() {

    let profile = this.props.profile;

  	return (
		  <div>
        <div style={styles.root}>
          <TextField hintText="Search"/>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Query" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Add" style={{margin: 4}} primary={true} onTouchTap ={this.handleRefresh}/>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  InterUsersPage, 
  (state) => ({
            profile: state.config.get('profile'),
          }), 
  {profileSaveAction});

export default muiThemeable()(NewComponent);