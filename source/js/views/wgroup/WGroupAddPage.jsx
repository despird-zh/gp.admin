import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActSubject from 'material-ui/svg-icons/action/subject';
import ActSuperAccnt from 'material-ui/svg-icons/action/supervisor-account';
import BaseInfo from './WGroupBaseInfo';
import MemberInfo from './WGroupMemberInfo';
import AuthConnect from '../../components/AuthConnect';

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;
  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    },
    spacer: { flex: 1 },
    activeBtnIconStyle: {
      fill: baseTheme.palette.accent2Color,
      color: baseTheme.palette.accent2Color,
    },
    btnIconStyle: {
      fill: baseTheme.palette.primary2Color,
      color: baseTheme.palette.primary2Color,
    },
  };
}

class WGroupAddPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errtips: {},
      avatar: 'assets/img/book2.jpg',
      content: 'member',
    };
    this.switchInfo = () => this.handleSwith('info');
    this.switchMember = () => this.handleSwith('member');
  }


  componentWillMount() {
    if (this.props.setCurrentPage) {
      this.props.setCurrentPage('wgroupadd');
    }
  }

  onClickSave = (img) => {
    const newState = Object.assign({}, this.state, { avatar: img });
    this.setState(newState);
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  handleOpen = () => {
    this.editor.show();
  }

  handleSwith = (content) => {
    const current = this.state.content;
    if (content === current) return;

    const newState = Object.assign({}, this.state, { content });
    this.setState(newState);
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    const { content } = this.state;
    return (
      <div>
        <div style={ styles.root }>
          <div>
            <IconButton
              iconStyle={ content === 'info' ? styles.activeBtnIconStyle : styles.btnIconStyle }
              onTouchTap={ this.switchInfo }
              disabled={ content === 'info' }
            >
              <ActSubject />
            </IconButton>
            <IconButton
              iconStyle={ content === 'member' ? styles.activeBtnIconStyle : styles.btnIconStyle }
              onTouchTap={ this.switchMember }
              disabled={ content === 'member' }
            >
              <ActSuperAccnt />
            </IconButton>
          </div>
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Refresh' style={ { margin: 4 } } onTouchTap={ this.handleRefresh } />
            <RaisedButton label='Save' style={ { margin: 4 } } primary={ true } onTouchTap={ this.handleSave } />
          </div>
        </div>
        { this.state.content === 'info' ?
          <BaseInfo
            errtips={ this.state.errtips }
            styles={ styles }
            muiTheme={ this.props.muiTheme }
            setEditorRef={ this.setEditorRef }
            onAvatarSave={ this.onAvatarSave }
            onAvatarOpen={ this.handleOpen }
          /> :
          <MemberInfo
            errtips={ this.state.errtips }
            styles={ styles }
            muiTheme={ this.props.muiTheme }
            setEditorRef={ this.setEditorRef }
            onAvatarSave={ this.onAvatarSave }
            onAvatarOpen={ this.handleOpen }
          />
        }
      </div>
    );
  }
}

WGroupAddPage.propTypes = {
  setCurrentPage: PropTypes.func,
  muiTheme: PropTypes.object,

};
const NewComponent = AuthConnect(
  WGroupAddPage,
  (state) => ({
    useradd: state.security.get('useradd'),
    storages: state.app.get('storages'),
  }),
  null);

export default NewComponent;
