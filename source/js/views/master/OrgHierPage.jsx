import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Avatar from 'material-ui/Avatar';

import SocialGrp from 'material-ui/svg-icons/social/group';
import SocialGrpAdd from 'material-ui/svg-icons/social/group-add';
import SocialPsnAdd from 'material-ui/svg-icons/social/person-add';
import AuthConnect from '../component/AuthConnect';
import MuiTreeList from '../component/TreeList/MuiTreeList';
import { OrgHierInfo, OrgHierMember } from './OrgHierInfo';

import { snackAction } from '../../store/actions/appActions';
import { saveOrgHier,
  MasterApis } from '../../store/actions/masterActions';

const getStyles = function (muiTheme) {
  const { baseTheme: { spacing, palette } } = muiTheme;
  return {
    rootStyle: {
      display: 'flex',
    },
    spacer: { flex: 1 },
    topFull: {
      flexBasis: '100%',
      display: 'flex',
      marginTop: 10,
    },
    inputItem: {
      width: 320,
      marginLeft: spacing.desktopGutterMini,
      marginRight: spacing.desktopGutterMini,
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
      paddingRight: spacing.desktopGutterMini,
    },
    iconBtnStyle: {
      float: 'right',
      width: 28,
      height: 28,
      padding: 2,
      marginRight: 16,
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
};
class OrgHierPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleMemberAdd = this.handleModeChange.bind(null, 'mbr-add');
    this.handleOrgAdd = this.handleModeChange.bind(null, 'org-add');
    this.handleOrgInfo = this.handleModeChange.bind(null, 'org-info');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('orghier'); }
    this.loadOrgNodes('root', { 'org-id': 'root' });
  }

  setOrgHierTree = (treeRef) => {
    this.orgHierTree = treeRef;
  }

  handleModeChange = (mode) => {
    this.props.saveOrgHier({ infomode: mode });
  }

  handleMemberChange = (evt, member) => {
    console.log(member);
  }

  handleOrgEditFieldChange = (key, event, newVal, payload) => {
    const selects = [];
    const data = {};
    if (selects.indexOf(key) >= 0) {
      data[key] = payload;
    } else {
      data[key] = newVal;
    }
    this.props.saveOrgHier({ orgedit: data });
  };

  handleOrgAddFieldChange = (key, event, newVal, payload) => {
    const selects = [];
    const data = {};
    if (selects.indexOf(key) >= 0) {
      data[key] = payload;
    } else {
      data[key] = newVal;
    }
    this.props.saveOrgHier({ orgadd: data });
  };

  handleOrgRemove = (nodePath, node) => {
    console.log(`${ nodePath } (org-remove) `);
    console.log(node);
  }

  handleOrgEditSave = () => {
    const orgedit = this.props.orghier.get('orgedit');
    const param = Object.assign({}, orgedit);
    delete param.children;
    delete param.key;
    delete param.icon;
    this.props.rpcInvoke(MasterApis.OrgNodeSave, param, (jsonRaw) => {
      if (jsonRaw.meta.state !== 'success') {
        return snackAction({ shown: true, snackTip: jsonRaw.meta.message });
      }
      return undefined;
    }, true, true);
  }

  handleOrgAddSave = () => {
    const orgadd = this.props.orghier.get('orgadd');
    const param = Object.assign({}, orgadd);
    delete param.children;
    delete param.key;
    delete param.icon;
    this.props.rpcInvoke(MasterApis.OrgNodeAdd, param, (jsonRaw) => {
      if (jsonRaw.meta.state !== 'success') {
        return snackAction({ shown: true, snackTip: jsonRaw.meta.message });
      }
      return undefined;
    }, true, true);
  }

  handleOrgTouchTap = (nodePath, node) => {
    this.loadOrgMembers(node.id);
    this.props.saveOrgHier({ infomode: 'org-edit', orgedit: node });
  }

  handleNestedListToggle = (isOpen, nodePath, node) => {
    if (isOpen) {
      this.loadOrgNodes(nodePath, { 'org-id': node.id });
    }
    this.loadOrgMembers(node.id);
    this.props.saveOrgHier({ infomode: 'org-edit', orgedit: node });
  }

  handleMemberRemove = ({ userid, account }) => {
    const orgedit = this.props.orghier.get('orgedit');
    this.props.rpcInvoke(MasterApis.OrgMemberRemove,
      {
        'org-id': orgedit.id,
        account,
      }, (jsonRaw) => {
        if (jsonRaw.meta.state !== 'success') {
          return snackAction({ shown: true, snackTip: jsonRaw.meta.message });
        }

        const orgmembers = this.props.orghier.get('orgmembers');
        const newmembers = orgmembers.filter((item) => {
          return item['user-id'] !== userid;
        });

        return saveOrgHier({ orgmembers: newmembers });
      }, true, true);
  }

  loadOrgNodes(npath, param) {
    let orgnodes = this.props.orghier.get('orgnodes');
    const paths = npath.split('-');

    let mountnode = orgnodes;
    for (let i = 1; i < paths.length; i++) {
      if (i === 1) {
        mountnode = mountnode.filter((item) => { return item.id === paths[i]; })[0];
      } else {
        mountnode = mountnode.children.filter((item) => { return item.id === paths[i]; })[0];
      }
    }

    this.props.rpcInvoke(MasterApis.OrgHierQuery, param, (json) => {
      const newnodes = json.map((item) => {
        item.key = item.id; // eslint-disable-line
        item.icon = item['has-child'] ? 'SocialPeople' : 'ActionSupervisorAccount'; // eslint-disable-line
        if (item['has-child']) {
          item.children = [{ // eslint-disable-line
            key: 'PLACE_HOLDER',
            title: 'Loading...',
            icon: 'ActionSupervisorAccount',
          }];
        }
        return item;
      });
      if (paths.length === 1) orgnodes = newnodes;
      else mountnode.children = newnodes;

      this.props.saveOrgHier({ orgnodes });
      this.orgHierTree.forceUpdate();
    });
  }

  loadOrgMembers(orgId) {
    this.props.rpcInvoke(MasterApis.OrgMembersQuery, { 'org-id': orgId }, (json) => {
      return saveOrgHier({ orgmembers: json });
    });
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    const { orgadd, orgedit, infomode, orgnodes, orgmembers } = this.props.mapJson(
      this.props.orghier,
      ['orgadd', 'orgedit', 'infomode', 'orgnodes', 'orgmembers']
      );

    const memberItems = orgmembers.map((item) => {
      return (
        <MemberListItem
          key={ item['user-id'] }
          itemData={ item }
          onItemRemove={ this.handleMemberRemove }
        />
      );
    });

    return (
      <div >
        <div style={ styles.topFull }>
          { (orgedit.id) && <Chip style={ { margin: 6 } }>
            Org. Node: { orgedit.title }
          </Chip> }
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Refresh' style={ { margin: 4 } } onTouchTap={ this.handleRefresh } />
          </div>
        </div>
        <div style={ styles.rootStyle }>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Hierarchy </h3>
            <Divider />
            <MuiTreeList
              ref={ this.setOrgHierTree }
              nodes={ orgnodes }
              useFolderIcons={ true }
              nodeRemovable={ true }
              onNodeRemove={ this.handleOrgRemove }
              onNodeTouchTap={ this.handleOrgTouchTap }
              onNestedListToggle={ this.handleNestedListToggle }
            />
          </div>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Members </h3>
            <Divider />
            <List>
              { memberItems }
            </List>
          </div>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>
              { (infomode === 'org-edit') && 'Org Detail Info.' }
              { (infomode === 'org-add') && 'Add New Org' }
              { (infomode === 'org-add') && 'Add Member' }
              { (infomode === 'org-edit') && <IconButton
                style={ styles.iconBtnStyle }
                iconStyle={ infomode === 'org-edit' ? styles.activeBtnIconStyle : styles.btnIconStyle }
                onTouchTap={ this.handleOrg }
              >
                <SocialGrp />
              </IconButton>}
              <IconButton
                style={ styles.iconBtnStyle }
                iconStyle={ infomode === 'org-add' ? styles.activeBtnIconStyle : styles.btnIconStyle }
                disabled={ infomode === 'org-add' }
                onTouchTap={ this.handleOrgAdd }
              >
                <SocialGrpAdd />
              </IconButton>
              <IconButton
                style={ styles.iconBtnStyle }
                iconStyle={ infomode === 'mbr-add' ? styles.activeBtnIconStyle : styles.btnIconStyle }
                disabled={ infomode === 'mbr-add' }
                onTouchTap={ this.handleMemberAdd }
              >
                <SocialPsnAdd />
              </IconButton>
            </h3>
            <Divider />
            { (infomode === 'org-add') && <OrgHierInfo
              styles={ styles }
              onHandleClear={ () => {} }
              onHandleChange={ this.handleOrgAddFieldChange }
              rpcInvoke={ this.props.rpcInvoke }
              muiTheme={ this.props.muiTheme }
              initialData={ orgadd }
              onHandleSave={ this.handleOrgAddSave }
              infomode={ infomode }
            />
            }
            { (infomode === 'org-edit') && <OrgHierInfo
              styles={ styles }
              onHandleClear={ () => {} }
              onHandleChange={ this.handleOrgEditFieldChange }
              rpcInvoke={ this.props.rpcInvoke }
              muiTheme={ this.props.muiTheme }
              initialData={ orgedit }
              onHandleSave={ this.handleOrgEditSave }
              infomode={ infomode }
            />
            }
            {
              (infomode === 'mbr-add') && <OrgHierMember
                styles={ styles }
                onHandleClear={ () => {} }
                onHandleSave={ () => {} }
                rpcInvoke={ this.props.rpcInvoke }
                muiTheme={ this.props.muiTheme }
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

OrgHierPage.propTypes = {
  setCurrentPage: PropTypes.func,
  rpcInvoke: PropTypes.func,
  orghier: PropTypes.object,
  muiTheme: PropTypes.object,
  saveOrgHier: PropTypes.func,
  mapJson: PropTypes.func,
};

/* eslint-disable */
const MemberListItem = ({itemData, onItemRemove, ...rest}) => {
  let {'user-id':userid, account, 'user-name':userName, 'avatar-link':avatarLink, 'source-abbr':sourceAbbr } = itemData;
  let avatar = <Avatar src={avatarLink} />;
  let handleItemRemove = () => {
    onItemRemove({ userid, account});
  };
  return (<ListItem
    primaryText={ `${account} - ${sourceAbbr}` }
    leftAvatar={ avatar }
    rightIconButton={ <IconButton onTouchTap={ handleItemRemove }><ContentClear /></IconButton> }
    value={ userid }
    {...rest} >
  </ListItem>);
};
/* eslint-enable */

const NewComponent = AuthConnect(
  OrgHierPage,
  (state) => ({
    orghier: state.master.get('orghier'),
  }),
  { saveOrgHier }
);

export default NewComponent;
