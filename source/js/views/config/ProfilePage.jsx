import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

import RaisedButton from 'material-ui/RaisedButton';

import { GPTextField } from '../component/GPComponents';
import AuthConnect from '../component/AuthConnect';
import { profileSave, ConfigApis } from '../../store/actions/configActions';

const styles = {
  root: {
    display: 'flex',
    position: 'relative',
    marginTop: 10,
  },
  spacer: { flex: 1 },
  container: {
    display: 'flex',
  },
};

class ProfilePage extends React.Component {

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('profile'); }
    this.props.rpcInvoke(ConfigApis.EntProfileQuery, {},
      profileSave);
  }

  handleSave = () => {
    const postdata = this.props.profile.toJS();
    this.props.rpcInvoke(ConfigApis.EntProfileSave, postdata,
    (json) => {
      this.props.snackOnlyAction({ show: true, snackTip: json.meta.message });
    },
    false,
    true);
  }

  handleFieldChange = (key, event, newVal) => {
    const data = {};
    data[key] = newVal;

    this.props.profileSave(data);
  };

  handleRefresh = () => {
    this.props.rpcInvoke(ConfigApis.EntProfileQuery, {},
      profileSave);
  };

  render() {
    const gutter = this.props.muiTheme.spacing.desktopGutter;
    const input = {
      marginRight: gutter,
    };
    const {
      'last-modified': lastModified,
      modifier,
      'entity-code': entityCode,
      'node-code': nodeCode,
      'short-name': shortName,
      abbr,
      name,
      admin,
      'service-url': serviceUrl,
      'binary-url': binaryUrl,
      description,
    } = this.props.profile.toJS();

    return (
      <div>
        <div style={ styles.root }>
          <Chip
            style={ { margin: 6 } }
          >
            { lastModified } Modified By { modifier }
          </Chip>
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Refresh' style={ { margin: 4 } } onTouchTap={ this.handleRefresh } />
            <RaisedButton label='Save' primary={ true } style={ { margin: 4 } } onTouchTap={ this.handleSave } />
          </div>
        </div>
        <div>
          <div style={ styles.container }>
            <GPTextField
              style={ input }
              floatingLabelText='Entity code'
              eventKey='entity-code'
              onHandleChange={ this.handleFieldChange }
              value={ entityCode }
            />
            <GPTextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Node code'
              eventKey='node-code'
              onHandleChange={ this.handleFieldChange }
              value={ nodeCode }
            />
          </div>
          <div style={ styles.container }>
            <GPTextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Short Name'
              eventKey='short-name'
              onHandleChange={ this.handleFieldChange }
              value={ shortName }
            />
            <GPTextField
              style={ Object.assign({}, input, { width: 100 }) }
              hintText='Hint Text'
              floatingLabelText='Abbreviation'
              eventKey='abbr'
              onHandleChange={ this.handleFieldChange }
              value={ abbr }
            />
          </div>
          <div style={ styles.container }>
            <GPTextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Entity Name'
              eventKey='name'
              onHandleChange={ this.handleFieldChange }
              value={ name }
            />
          </div>
          <div style={ styles.container }>
            <GPTextField
              style={ input }
              hintText='Hint Text'
              floatingLabelText='Administrator'
              eventKey='admin'
              onHandleChange={ this.handleFieldChange }
              value={ admin }
            />
          </div>
          <div style={ styles.container }>
            <GPTextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Service URL'
              eventKey='service-url'
              onHandleChange={ this.handleFieldChange }
              value={ serviceUrl }
            />
          </div>
          <div style={ styles.container }>
            <GPTextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              floatingLabelText='Binary URL'
              eventKey='binary-url'
              onHandleChange={ this.handleFieldChange }
              value={ binaryUrl }
            />
          </div>
          <div style={ styles.container }>
            <GPTextField
              style={ Object.assign({}, input, { width: 512 + gutter }) }
              hintText='Hint Text'
              value={ description }
              eventKey='description'
              onHandleChange={ this.handleFieldChange }
              floatingLabelText='Description'
            />
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  setCurrentPage: PropTypes.func,
  rpcInvoke: PropTypes.func,
  muiTheme: PropTypes.object,
  profile: PropTypes.object,
  snackOnlyAction: PropTypes.func,
  profileSave: PropTypes.func,
};

const NewComponent = AuthConnect(
  ProfilePage,
  (state) => ({
    profile: state.config.get('profile'),
  }),
  { profileSave });

export default NewComponent;
