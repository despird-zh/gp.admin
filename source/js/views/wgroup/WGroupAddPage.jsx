import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AvatarEditor from 'react-avatar-editor'

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

  setEditorRef = (editor) => {
    this.editor = editor
  }

  render() {
  	return (
  		<div>
  		<AvatarEditor
	  		ref={this.setEditorRef}
	        image="assets/img/book2.jpg"
	        width={200}
	        height={200}
	        border={50}
	        color={[255, 255, 255, 0.6]} // RGBA 
	        scale={1.1}
	        rotate={0}/>
	      <RaisedButton label="save" style={{margin: 4}} onTouchTap ={this.onClickSave}/>
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