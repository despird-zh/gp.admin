import React from 'react'
import ReactDOM from 'react-dom'
import Slider from 'material-ui/Slider';
import ReactAvatarEditor from 'react-avatar-editor'
import RaisedButton from 'material-ui/RaisedButton';
export default class AvatarEditor extends React.Component {
  state = {
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 150,
    height: 150
  }

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
      }
    })
  }

  handleSlider = (event, value) => {
    this.setState({scale: value});
  };

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value)
    this.setState({ borderRadius })
  }

  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = (e) => {
    const width = parseInt(e.target.value)
    this.setState({ width })
  }

  handleHeight = (e) => {
    const height = parseInt(e.target.value)
    this.setState({ height })
  }

  logCallback (e) {
    console.log('callback', e)
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    console.log('Position set to', position)
    this.setState({ position })
  }

  render () {
    return (
      <div>
        <ReactAvatarEditor
          ref={this.setEditorRef}
          scale={parseFloat(this.state.scale)}
          width={this.state.width}
          height={this.state.height}
          position={this.state.position}
          onPositionChange={this.handlePositionChange}
          rotate={parseFloat(this.state.rotate)}
          borderRadius={this.state.borderRadius}
          onSave={this.handleSave}
          onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
          onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
          onImageReady={this.logCallback.bind(this, 'onImageReady')}
          onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
          onDropFile={this.logCallback.bind(this, 'onDropFile')}
          image="assets/img/book2.jpg"
        />
        <br />
        Zoom:
        <Slider
          min={0.5}
          max={2.5}
          step={0.05}
          defaultValue={1}
          onChange={this.handleSlider}
        />
        <br />
        <RaisedButton
           containerElement='label' // <-- Just add me!
           label='Choose'>
           <input type="file" style={{display:'none'}}/>
        </RaisedButton>
        <RaisedButton
           containerElement='label'
           onTouchTap ={this.handleSave}
           label='Preview'/>
        <br />
        { !!this.state.preview &&
          <img
            src={this.state.preview.img}
            style={{ width:30,height:30,borderRadius: `${(Math.min(this.state.preview.height, this.state.preview.width) + 10) * ((this.state.preview.borderRadius / 2) / 100)}px` }}
          />
        }

      </div>
    )
  }
}

