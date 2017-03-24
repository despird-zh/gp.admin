import React from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 },
  iconStyle: {
    height:20
  }
}
export default class SettingPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
      settings: [
        {
          id: 'a',
          name: 'ff'
        },
        {
          id: 'c',
          name: 'ff'
        },
        {
          id: 'b',
          name: 'ff'
        },
      ]
    };
  }
  
  handleClick = (e) => {
    console.log(e.target.dataset);
  }

  render() {
    
    let rows = this.state.settings.map((item, index) => {
      console.log(item);
      return <TableRow key={item.id} >
              <TableRowColumn>{ item.id }</TableRowColumn>
              <TableRowColumn>{ item.name }</TableRowColumn>
              <TableRowColumn>
                <IconButton iconStyle={styles.iconStyle} onClick={ this.handleClick }><ModeEditIcon/></IconButton >
              </TableRowColumn>
            </TableRow>;
    });
  	return (
		  <div >
		  	<div style={styles.root}>
		  	   <TextField hintText="Hint Text"/>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Save" primary={true} style={{margin: 4}} />
          </div>
  			</div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>OP.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
  		</div>
  	);
  }
}