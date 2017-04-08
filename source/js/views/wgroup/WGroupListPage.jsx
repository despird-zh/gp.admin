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
import { groupsSaveAction, groupSaveAction, filterSaveAction, searchClearAction } from '../../store/actions/wgroupActions';


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

  render() {

    let styles = getStyles(this.props.muiTheme);
    let users = this.props.grouplist.get('groups').toJS();
    let internal = this.props.grouplist.get('internal');
    let external = this.props.grouplist.get('external');
    let search = this.props.grouplist.get('search');

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
            <RaisedButton label="Clear" style={{margin: 4}} />
              <RaisedButton label="Query" style={{margin: 4}} />
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
            <TableRow >
              <TableRowColumn>xxx</TableRowColumn>
              <TableRowColumn>xxx</TableRowColumn>
              <TableRowColumn>xxx</TableRowColumn>
              <TableRowColumn>xxx</TableRowColumn>
              <TableRowColumn>xxxx</TableRowColumn>
              <TableRowColumn style={{ width: 80}}>
                <IconButton iconStyle={styles.iconStyle} ><ModeEditIcon/></IconButton >
              </TableRowColumn>
            </TableRow>;
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
  {groupsSaveAction, groupSaveAction, filterSaveAction, searchClearAction});

export default muiThemeable()(NewComponent);