import React from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import AuthConnect from '../../components/AuthConnect';
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
      marginRight: baseTheme.spacing.desktopGutter,
    },
    rightDetail: {
      width: 256,
    },
  }
}

class SettingPage extends React.Component {

	constructor(props, context) {
    super(props, context);

    this.state = {
      settings: [],
      setting: {
        optionId: 0,
        description: '',
        group: '',
        option: '',
        value: '',
      }
    };
  }
  
  handleClick = (option) => {
    let idx = this.state.settings.findIndex((item) => {return item.option == option });
    let setting = this.state.settings[idx];
    let state = Object.assign(this.state, {setting});
    this.setState(state);
  }

  handleRefresh = () => {
    this.props.rpcInvoke(ConfigApis.SysOptsQuery, {},settingsSaveAction);
  }

  render() {
    
    let styles = getStyles(this.props.muiTheme);
    let rows = this.state.settings.map((item, index) => {
      
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
          <div style={styles.rightDetail}>
            <TextField
              defaultValue="Group"
              floatingLabelText="Option Group"
              value={this.state.setting.group}
              floatingLabelFixed={true}/>
            <TextField
              defaultValue="Default Value"
              floatingLabelText="Option code"
              value={this.state.setting.option}
              floatingLabelFixed={true}/>
            <TextField
              defaultValue="Default Value"
              floatingLabelText="Option value"
              value={this.state.setting.value}
              floatingLabelFixed={true}/>
            <TextField
              defaultValue="Default Value"
              floatingLabelText="Description"
              value={this.state.setting.description}
              floatingLabelFixed={true}/>
            <RaisedButton label="Save" primary={true} style={{margin: 4}} />
          </div>
        </div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  SettingPage, 
  (state) => ({
            profile: state.config.get('profile'),
          }), 
  {});

export default muiThemeable()(NewComponent);