import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AvatarEditor from '../../components/AvatarEditor/AvatarEditor'
import AvatarEditDialog from '../../components/AvatarEditor/AvatarEditDialog'

import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';

class WGroupAddPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
    	errtips: {}
    };
  }

  componentWillMount() {
	  if(this.props.setCurrentPage)
  		this.props.setCurrentPage('wgroupadd');
  }

  onClickSave = () => {
    const canvas = this.editor.getImage()
    let dataURL = canvas.toDataURL();
    console.log(dataURL);
    const canvasScaled = this.editor.getImageScaledToCanvas()
  }

  handleOpen = ()=>{
    this.refs.avatarDialog.show();
  }
  setEditorRef = (editor) => {
    this.editor = editor
  }

  render() {
  	return (
  		<div>
  		<AvatarEditor/>
      <RaisedButton
           containerElement='label'
           onTouchTap ={this.handleOpen}
           label='Dialog'/>
      <AvatarEditDialog ref="avatarDialog"/>
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