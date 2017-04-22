import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { hashHistory } from 'react-router';
import { List } from 'immutable';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import AuthConnect from '../../components/AuthConnect';
import { saveUsers, 
  saveUsersFilter, 
  clearUsersFilter,
  SecurityApis } from '../../store/actions/securityActions';

function getStyles (muiTheme) {
  const {baseTheme} = muiTheme;

  return {
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 },
      iconStyle: {
      height:20
    },
  search: {
    marginRight: baseTheme.spacing.desktopGutterLess,
  },
  checkbox: {
    width: 100,
    marginTop: 10
  }};
}

class UserListPage extends React.Component {

	constructor(props, context) {
    super(props, context);

  }
  
  handleJump = (userId) => {

    let url = '/security/useredit/' + userId;
    hashHistory.push(url);
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('userlist');
  }
  
  handleQuery = () => {

    let search = this.props.userlist.search;
    let params = {filterkey: search, state: 'ALL', type: 'ALL'};
    this.props.rpcInvoke(SecurityApis.UsersQuery, params, saveUsers);
  }

  handleClear = () => {
    let filter = { 
      search: '', 
      internal: false, 
      external: false,
    };

    this.props.clearUsersFilter(filter);
  }

  handleFilter = (key, event, newVal)=>{
    let filter = {};
    if(key=='search'){
      filter[key] = event.target.value;
    }else{
      filter[key] = newVal;
    }
    
    this.props.saveUsersFilter(filter);
  }

  render() {

    let {users, internal, external, search} = this.props.userlist.toJS();
    
    let styles = getStyles(this.props.muiTheme);

    let rows = users.map((item, index) => {
      let {account, email, name, mobile, state, 'source-name':sourceName,'user-id':userId} = item;
      return <TableRow key={account}>
              <TableRowColumn>{account} - {name}</TableRowColumn>
              <TableRowColumn>{email}</TableRowColumn>
              <TableRowColumn>{mobile}</TableRowColumn>
              <TableRowColumn>{state}</TableRowColumn>
              <TableRowColumn>{sourceName}</TableRowColumn>
              <TableRowColumn style={{ width: 80}}>
                <IconButton iconStyle={styles.iconStyle} onClick={this.handleJump.bind(null, userId)}><ModeEditIcon/></IconButton >
              </TableRowColumn>
            </TableRow>;
    });

  	return (
		  <div>
        <div style={styles.root}>
          <TextField 
            style={ styles.search} 
            value={search }
            onChange={ this.handleFilter.bind(null, 'search' )}
            hintText="Search"/>
          <Checkbox
            label="Internal"
            style={ styles.checkbox }
            checked={ internal }
            onCheck={this.handleFilter.bind(null, 'internal' )}
          />
          <Checkbox
            label="External"
            style={ styles.checkbox }
            checked={ external }
            onCheck={this.handleFilter.bind(null, 'external' )}
          />
          <div style={styles.spacer}/>
          <div>
            <RaisedButton label="Clear" style={{margin: 4}} onTouchTap ={ this.handleClear }/>
              <RaisedButton label="Query" style={{margin: 4}} onTouchTap ={ this.handleQuery }/>
          </div>
        </div>
        <Table>
          <TableHeader
          displaySelectAll={ false }
              adjustForCheckbox={ false }
              enableSelectAll={ false } >
            <TableRow>
              <TableHeaderColumn>Account/Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Mobile</TableHeaderColumn>
              <TableHeaderColumn>State</TableHeaderColumn>
              <TableHeaderColumn>Entity</TableHeaderColumn>
              <TableHeaderColumn  style={{ width: 80}}>OP.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  UserListPage, 
  (state) => ({
    userlist: state.security.get('userlist'),
  }), 
  { saveUsersFilter, clearUsersFilter });

export default NewComponent;