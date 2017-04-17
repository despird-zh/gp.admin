import React, {Component, PropTypes} from 'react'
import ListItem from 'material-ui/List/ListItem'

class TreeItem extends Component {

  constructor(props) {
    super(props)
  }

  getLeftIcon = () => {
  	let { useFolderIcons, icon } = this.props;
    if (useFolderIcons) {
      if (children) {
          return <FolderIcon />
      } else {
          return <FileIcon />
      }
    } else {
      return icon
    }
  }

  handleTouchTap = (e) => {
  	console.log(e);
  }

  render(){

  	const { key, title, style, depth } = this.props;
    const nodeHeight = (this.props.nodeHeight) ? this.props.nodeHeight : '48px'

    let baseStyle = {
      paddingLeft: depth * 16,
      backgroundColor: active ? 'rgba(0,0,0,0.2)' : null,
      height: nodeHeight,
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.87)',
      overflow: 'hidden',
      transform: 'translateZ(0)'                       
    }

    return (
      <ListItem
        key={'treeListItem-' + i}
        primaryText={ title }
        style={Object.assign({}, baseStyle, style)}
        leftIcon={getLeftIcon()}
        rightIcon={ (!children) ? <OpenIcon /> : <CloseIcon /> }
        onTouchTap={ this.handleTouchTap }>
        {React.Children.map(children, (item, index) => {
              return props.root.renderTreeNode(item, index, depth +1, key);
            }, props.root)}
      <ListItem>
	  )
  }
}

export default TreeItem;