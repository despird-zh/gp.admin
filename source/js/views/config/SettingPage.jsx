import React from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import AuthConnect from '../../components/AuthConnect';
import SettingDialog from './SettingDialog';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { settingsSaveAction,ConfigApis } from '../../store/actions/configActions';

function  getStyles(muiTheme) {

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
    container: {
      display: 'flex',
    },
    leftTable: {
      flex: 1,
    },
  }
}

class SettingPage extends React.Component {

	constructor(props, context) {
    super(props, context);

    this.state = {
      setting: {
        optionId: 0,
        description: '',
        group: '',
        option: '',
        value: '',
      }
    };
  }
  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('settings');
  }

  handleClick = (option) => {

    let idx = this.props.settings.findIndex((item) => {return item.option == option });
    let setting = this.props.settings[idx];
    let state = Object.assign(this.state, {setting});
    this.setState(state);
    this.settingDialog.handleOpen(setting);
  }

  handleRefresh = () => {
    this.props.rpcInvoke(ConfigApis.SysOptsQuery, {},settingsSaveAction,false);
  }

  render() {
    
    let styles = getStyles(this.props.muiTheme);
    let rows = this.props.settings.map((item, index) => {
      
      return <TableRow key={ item.option } >
              <TableRowColumn style={{ width: 120}}>{ item.group }</TableRowColumn>
              <TableRowColumn>{ item.option }</TableRowColumn>
              <TableRowColumn>{ item.value }</TableRowColumn>
              <TableRowColumn>{ item.description }</TableRowColumn>
              <TableRowColumn style={{ width: 80}}>
                <IconButton iconStyle={styles.iconStyle} onClick={ this.handleClick.bind(null, item.option) }><ModeEditIcon/></IconButton >
              </TableRowColumn>
            </TableRow>;
    });

  	return (
		  <div >
		  	<div style={styles.root}>
		  	  <TextField hintText="Search"/>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Query" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
          </div>
  			</div>
        <div style={styles.container}>
          <Table 
            wrapperStyle={styles.leftTable}
            >
            <TableHeader
              displaySelectAll={ false }
              adjustForCheckbox={ false }
              enableSelectAll={ false } >
              <TableRow>
                <TableHeaderColumn style={{ width: 120}}>Category</TableHeaderColumn>
                <TableHeaderColumn>Option</TableHeaderColumn>
                <TableHeaderColumn>Value</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn style={{ width: 80}}>OP.</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}>
              {rows}
            </TableBody>
          </Table>
          <SettingDialog 
            innerRef={(inputEl) => {
              this.settingDialog = inputEl;
            }}
            muiTheme={this.props.muiTheme}
          />
        </div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  SettingPage, 
  (state) => ({
            settings: state.config.get('settings'),
          }), 
  {});

export default NewComponent;