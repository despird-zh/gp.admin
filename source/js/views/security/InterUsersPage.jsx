import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { hashHistory } from 'react-router';
import { List } from 'immutable';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { usersSaveAction, userSaveAction, filterSaveAction, searchClearAction } from '../../store/actions/securityActions';
import { securityService } from '../../rpcapi';

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

class InterUsersPage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }
  
  handleJump = (account) => {

    let url = '/security/edituser/' + account;
    let userinfo = this.props.userlist.get('users').find((item, index, iter) => {
      return item.account == account;
    });

    this.props.userSaveAction(userinfo);
    hashHistory.push(url);
  }

  handleQuery = () => {

    let search = this.props.userlist.get('search');
    let params = {filterkey: search, state: 'ALL', type: 'ALL'};
    this.props.rpcInvoke(securityService.queryUsers, params, (response) => {
      console.log(response.data);
      let data = List(response.data);
     
      this.props.usersSaveAction(data);
    });
  }

  handleClear = () => {
    let filter = { 
      search: '', 
      internal: false, 
      external: false,
    };

    this.props.searchClearAction(filter);
  }

  handleFilter = (key, event, newVal)=>{
    let filter = {};
    if(key=='search'){
      filter[key] = event.target.value;
    }else{
      filter[key] = newVal;
    }
    
    this.props.filterSaveAction(filter);
  }

  render() {
    console.log(this.props.userlist);
    let users = this.props.userlist.get('users').toJS();
    let internal = this.props.userlist.get('internal');
    let external = this.props.userlist.get('external');
    let search = this.props.userlist.get('search');
        
    let styles = getStyles(this.props.muiTheme);
    console.log(users);
    let rows = users.map((item, index) => {

      return <TableRow key={item.account}>
              <TableRowColumn>{item.account} - {item.fullName}</TableRowColumn>
              <TableRowColumn>{item.email}</TableRowColumn>
              <TableRowColumn>{item.mobile}</TableRowColumn>
              <TableRowColumn>{item.state}</TableRowColumn>
              <TableRowColumn>{item.sourceName}</TableRowColumn>
              <TableRowColumn style={{ width: 80}}>
                <IconButton iconStyle={styles.iconStyle} onClick={this.handleJump.bind(null, item.account)}><ModeEditIcon/></IconButton >
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
  InterUsersPage, 
  (state) => ({
            userlist: state.security.get('userlist'),
          }), 
  {usersSaveAction, userSaveAction, filterSaveAction, searchClearAction});

export default muiThemeable()(NewComponent);