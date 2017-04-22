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
import { groupsSave, groupSave, filterSave, searchClear, WorkgroupApis } from '../../store/actions/wgroupActions';


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
    }
  };
}

class WGroupListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('wgrouplist');
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

  handleClear = () => {
    let filter = { 
      search: '', 
      internal: false, 
      external: false,
    };

    this.props.searchClear(filter);
  }

  handleJump = (wgroupId) => {

    let url = '/wgroup/wgroupedit/' + wgroupId;
    hashHistory.push(url);
  }

  handleQuery = () => {

    let search = this.props.grouplist.search;
    let params = {filterkey: search, state: 'ALL', type: 'ALL'};

    this.props.rpcInvoke(WorkgroupApis.GroupsQuery, params, groupsSave);
  }

  render() {

    let styles = getStyles(this.props.muiTheme);
    let {groups, internal, external, search} = this.props.grouplist.toJS();

    let rows = groups.map((item, index) => {
      let {'workgroup-id':wgroupId, 'workgroup-name':wgroupName, 
        'source-name':sourceName, admin, manager,
        state, description, 'create-date':createDate } = item;

      return <TableRow key={wgroupId}>
              <TableRowColumn>{wgroupName}</TableRowColumn>
              <TableRowColumn>{sourceName}</TableRowColumn>
              <TableRowColumn>{admin} - {manager}</TableRowColumn>
              <TableRowColumn>{state}</TableRowColumn>
              <TableRowColumn>{description}</TableRowColumn>
              <TableRowColumn style={{ width: 130}}>{createDate}</TableRowColumn>
              <TableRowColumn style={{ width: 80}}>
                <IconButton iconStyle={styles.iconStyle} onClick={this.handleJump.bind(null, wgroupId)}><ModeEditIcon/></IconButton >
              </TableRowColumn>
            </TableRow>;
    });

    return (
      <div>
        <div style={styles.root}>
          <TextField 
            style={ styles.search} 
            value={ search }
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
            <RaisedButton label="Clear" style={{margin: 4}}  onTouchTap ={ this.handleClear }/>
              <RaisedButton label="Query" style={{margin: 4}} onTouchTap ={ this.handleQuery }/>
          </div>
        </div>
        <Table>
          <TableHeader
          displaySelectAll={ false }
              adjustForCheckbox={ false }
              enableSelectAll={ false } >
            <TableRow>
              <TableHeaderColumn>Wgroup Name</TableHeaderColumn>
              <TableHeaderColumn>Source</TableHeaderColumn>
              <TableHeaderColumn>Admin/Manager</TableHeaderColumn>
              <TableHeaderColumn>State</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 130}}>Create</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 80}}>OP.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { rows }
          </TableBody>
        </Table>
      </div>
    );
  }
}

const NewComponent = AuthConnect(
  WGroupListPage, 
  (state) => ({
            grouplist: state.wgroup.get('grouplist'),
          }), 
  {groupsSave, groupSave, filterSave, searchClear});

export default NewComponent;