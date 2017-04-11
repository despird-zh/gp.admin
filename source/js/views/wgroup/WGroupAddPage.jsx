import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AvatarEditDialog from '../../components/ImageEditor/AvatarEditDialog'

import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';

class WGroupAddPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
    	errtips: {},
      avatar: 'assets/img/book2.jpg'
    };
  }

  componentWillMount() {
	  if(this.props.setCurrentPage)
  		this.props.setCurrentPage('wgroupadd');
  }

  onClickSave = (img) => {
    let newState = Object.assign({}, this.state, {avatar: img});
    this.setState(newState);
  }

  handleOpen = ()=>{
    this.editor.show();
  }

  setEditorRef = (editor) => {
    this.editor = editor
  }

  render() {
  	return (
  		<div>
      <img
            src={this.state.avatar}
            style={{ width:50,height:50,}}
          />
      <RaisedButton
           containerElement='label'
           onTouchTap ={this.handleOpen}
           label='Dialog'/>
      <AvatarEditDialog ref={this.setEditorRef} onSave={this.onClickSave}/>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  WGroupAddPage, 
  (state) => ({
    useradd: state.security.get('useradd'),
    storages: state.app.get('storages')
   }), 
  null);

export default muiThemeable()(NewComponent);