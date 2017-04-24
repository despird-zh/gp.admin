import React from 'react';
import SocialGrp from 'material-ui/svg-icons/social/group';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Avatar from 'material-ui/Avatar';

import SocialGrpAdd from 'material-ui/svg-icons/social/group-add';
import SocialPsnAdd from 'material-ui/svg-icons/social/person-add';
import AuthConnect from '../../components/AuthConnect';
import MuiTreeList from '../../components/TreeList/MuiTreeList';
import UserAutoComplete from '../common/UserAutoComplete';

var nodes = [
  {
    key: 'k1',
    title: 'Title1',
    icon: 'ActionSupervisorAccount',
  },{
    key: 'k2',
    title: 'Title2 (5/41)',
    icon: 'SocialPeople',
    children: [
      {
        key: 'k21',
        title: 'Title21',
        icon: 'ActionSupervisorAccount',
      },
      {
        key: 'k22',
        title: 'Title22',
        icon: 'ActionSupervisorAccount',
      }
    ]
  }
];

const SelectableList = makeSelectable(List);

const getStyles = function (muiTheme) {
  const { baseTheme: { spacing, palette } } = muiTheme;
  return {
    rootStyle: {
      display: 'flex'
    },
    spacer: { flex: 1 },
    topFull: {
      flexBasis: '100%',
      display: 'flex', 
      marginTop: 10
    },
    inputItem: {
      width: 320,
      marginLeft: spacing.desktopGutterMini,
      marginRight: spacing.desktopGutterMini
    },
    panelTitle: {
      color: palette.secondaryTextColor,
      fontSize: 16, 
      marginBottom: spacing.desktopGutterMini,
      marginTop: spacing.desktopGutterMini,
    },
    halfStyle: {
      flexBasis: '33.33%',
      paddingLeft: spacing.desktopGutterMini,
      paddingRight: spacing.desktopGutterMini
    },
    iconBtnStyle: {
      float: 'right', 
      width: 28,
      height: 28,
      padding: 2,
      marginRight: 16
    },
    activeBtnIconStyle: {
      fill: palette.disabledColor,
      color: palette.disabledColor,
    },
    btnIconStyle: {
      fill: palette.primary2Color,
      color: palette.primary2Color,
    },
  };
}
class OrgHierPage extends React.Component { 

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('orghier');
  }

  render() {
    let styles = getStyles(this.props.muiTheme);
    let infomode = 'mbr-add';
    console.log(styles)
    return (
      <div >
        <div style={styles.topFull}>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
          </div>
        </div>
        <div style={ styles.rootStyle }>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Hierarchy </h3>
            <Divider/>
            <MuiTreeList 
              nodes={ nodes } 
              useFolderIcons={true}
              nodeRemovable={true}
              onNodeRemove={()=>{}}>
            </MuiTreeList>
          </div>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Members </h3>
            <Divider/>
            <SelectableList
                value={ 1 }
                onChange={this.handleMemberChange}>
                <ListItem
                  primaryText="Brendan Lim"
                  leftAvatar={<Avatar src="assets/img/ok-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={1}
                />
                <ListItem
                  primaryText="Eric Hoffman"
                  leftAvatar={<Avatar src="assets/img/kolage-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberRemove }><ContentRemove/></IconButton>}
                  value={2}
                />
                <ListItem
                  primaryText="Grace Ng - 永东科技"
                  leftAvatar={<Avatar src="assets/img/uxceo-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={3}
                />
                <ListItem
                  primaryText="Kerem Suer"
                  leftAvatar={<Avatar src="assets/img/kerem-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={4}
                />
                <ListItem
                  primaryText="Raquel Parrado"
                  leftAvatar={<Avatar src="assets/img/raquelromanp-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={5}
                />
              </SelectableList>
            </div>
            <div style={ styles.halfStyle }>
              <h3 style={ styles.panelTitle }>Members 
                <IconButton 
                  style={styles.iconBtnStyle} 
                  iconStyle={ infomode == 'grp-add' ? styles.activeBtnIconStyle : styles.btnIconStyle } 
                  disabled={ infomode == 'grp-add' }
                  onTouchTap={ this.handleGroupAdd }>
                  <SocialGrpAdd></SocialGrpAdd>
                </IconButton>
                <IconButton 
                  style={styles.iconBtnStyle} 
                  iconStyle={ infomode == 'mbr-add' ? styles.activeBtnIconStyle : styles.btnIconStyle } 
                  disabled={ infomode == 'mbr-add' }
                  onTouchTap={ this.handleMemberAdd }>
                  <SocialPsnAdd></SocialPsnAdd>
                </IconButton>
              </h3>
              <Divider/>
              <OrgHierInfo
               styles={styles}
               onHandleClear={()=>{}}
               onHandleSave={()=>{}}
               rpcInvoke={this.props.rpcInvoke}
               muiTheme={this.props.muiTheme}/>
            </div>
          </div>
      </div>
    );
  };
}

const OrgHierInfo = ({ styles, onHandleClear, onHandleSave,muiTheme, rpcInvoke, ...props }) => {
  return (
  <div>
    <TextField
      style= {styles.inputItem}
      hintText="16 letters"
      floatingLabelText="Current Entity Node"
    />
    <TextField
      style={ styles.inputItem }
      hintText="no more than 32 letters"
      floatingLabelText="Org. Node Name"
    />
    <UserAutoComplete
      style={ styles.inputItem }
      muiTheme={muiTheme}
      rpcInvoke = {rpcInvoke}
      hintText="Assign a user as administrator"
      floatingLabelText="Administrator"
    />
    <UserAutoComplete 
      style={ styles.inputItem }
      muiTheme={muiTheme}
      rpcInvoke = {rpcInvoke}
      hintText="Assign a manager to org node"
      floatingLabelText="Manager"
    />
    <TextField
      style={ styles.inputItem }
      hintText="no more than 32 letters"
      floatingLabelText="Contact Mail"
    />
    <TextField
      style={ styles.inputItem }
      hintText="no more than 32 letters"
      floatingLabelText="Description"
    />
    <div style={{marginTop: 10}}>
        <RaisedButton label="Clear" style={{margin: 4}} onTouchTap ={ onHandleClear }/>
        <RaisedButton label="Save" style={{margin: 4, float: 'right'}} primary={true} onTouchTap ={ onHandleSave }/>
    </div>
  </div>
  );
}

const NewComponent = AuthConnect(
  OrgHierPage, 
  (state) => ({
    useradd: state.security.get('useradd'),
    storages: state.app.get('storages')
   }), 
  null);

export default NewComponent;