import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Slider from 'material-ui/Slider';
import ReactAvatarEditor from 'react-avatar-editor';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  content: {
    width: 410,
  },
  title: {
    paddingBottom: 10,
  },
  body: {
    paddingBottom: 20,
    display: 'block',
  },
  slider: {
    marginTop: 10,
    marginBottom: 15,
  },
  msg: {
    marginTop: 0,
    marginBottom: 10,
  },
};

class AvatarEditDialog extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 150,
      height: 150,
      imgsrc: 'assets/img/book2.jpg',
      message: '',
      opening: false,
    };
  }


  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  }

  handlePreview = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();

    this.setState({
      preview: {
        img,
      },
    });
  }

  handleSave = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();

    if (this.props.onSave) this.props.onSave(img);
    this.hide();
  }

  handleSlider = (event, value) => {
    this.setState({ scale: value });
  };

  logCallback() {
    // console.log('callback', e)
  }

  handlePositionChange = position => {
    this.setState({ position });
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const ext = file.name.match(/\.([^.]+)$/)[1];
    let pass = false;

    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'bmp':
      case 'png':
      case 'tif':
        pass = true;
        break;
      default:
        pass = false;
    }
    if (!pass) {
      const newState = Object.assign({}, this.state, { message: 'chosen file is not supported' });
      this.setState(newState);
      return;
    }
    reader.onload = (evt) => {
      const newState = Object.assign({}, this.state, { imgsrc: evt.target.result });
      this.setState(newState);
    };
    reader.readAsDataURL(file);
  }

  hide = () => {
    const newState = Object.assign({}, this.state, { opening: false });
    this.setState(newState);
    console.log(this.state.opening);
  };
  show= () => {
    const newState = Object.assign({}, this.state, { opening: true });
    this.setState(newState);
  }
  render() {
    return (
      <Dialog
        title='Customize Avatar'
        titleStyle={ styles.title }
        actionsContainerStyle={ styles.actions }
        bodyStyle={ styles.body }
        contentStyle={ styles.content }
        onRequestClose={ this.hide }
        modal={ false }
        open={ this.state.opening }
      >
        { !this.state.message === '' &&
        <div style={ styles.msg }><span>{this.state.message}</span></div>
        }
        <ReactAvatarEditor
          ref={ this.setEditorRef }
          scale={ parseFloat(this.state.scale) }
          width={ this.state.width }
          height={ this.state.height }
          position={ this.state.position }
          onPositionChange={ this.handlePositionChange }
          rotate={ parseFloat(this.state.rotate) }
          borderRadius={ this.state.borderRadius }
          onSave={ this.handleSave }
          // onLoadFailure={ this.logCallback.bind(this, 'onLoadFailed') }
          // onLoadSuccess={ this.logCallback.bind(this, 'onLoadSuccess') }
          // onImageReady={ this.logCallback.bind(this, 'onImageReady') }
          // onImageLoad={ this.logCallback.bind(this, 'onImageLoad') }
          // onDropFile={ this.logCallback.bind(this, 'onDropFile') }
          image={ this.state.imgsrc }
        />
        <div style={ { float: 'right' } }>
          { !!this.state.preview &&
          <img
            role='presentation'
            src={ this.state.preview.img }
            style={ { width: 100, height: 100 } }
          />
        }
          <br />
          { !!this.state.preview &&
          <img
            role='presentation'
            src={ this.state.preview.img }
            style={ { width: 50, height: 50 } }
          />
        }
        </div>
        <Slider
          min={ 0.5 }
          max={ 2.5 }
          step={ 0.05 }
          defaultValue={ 1 }
          sliderStyle={ styles.slider }
          onChange={ this.handleSlider }
        />
        <RaisedButton
          containerElement='label'
          label='Choose'
          style={ { marginRight: 16 } }
        >
          <input type='file' style={ { display: 'none' } } accept='image/*' onChange={ this.handleFileChange } />
        </RaisedButton>
        <RaisedButton
          containerElement='label'
          onTouchTap={ this.handlePreview }
          label='Preview'
        />
        <RaisedButton
          containerElement='label'
          onTouchTap={ this.handleSave }
          label='Save'
          style={ { float: 'right' } }
        />

      </Dialog>
    );
  }
}

AvatarEditDialog.propTypes = {
  onSave: PropTypes.func,
};
export default AvatarEditDialog;
