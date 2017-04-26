import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';

const GPTextField = ({ eventKey, onHandleChange, ...rest }) => {
  const handleFieldChange = onHandleChange && onHandleChange.bind(null, eventKey);
  return (
    <TextField
      onChange={ handleFieldChange }
      { ...rest }
    />
  );
};
GPTextField.propTypes = {
  eventKey: PropTypes.string,
  onHandleChange: PropTypes.func,
};

const GPSelectField = ({ eventKey, onHandleChange, children, ...rest }) => {
  const handleFieldChange = onHandleChange && onHandleChange.bind(null, eventKey);
  return (
    <SelectField
      onChange={ handleFieldChange }
      { ...rest }
    >
      {children}
    </SelectField>
  );
};
GPSelectField.propTypes = {
  eventKey: PropTypes.string,
  children: PropTypes.array,
  onHandleChange: PropTypes.func,
};

const PageIconButton = ({ pageIcon, handleTouchJump, styles }) => {
  const handTouchTap = () => {
    handleTouchJump(pageIcon);
  };
  return pageIcon.visible ? <IconButton
    key={ pageIcon.path }
    onTouchTap={ handTouchTap }
    iconStyle={ !pageIcon.disabled ? styles.btnIconStyle : styles.activeBtnIconStyle }
    disabled={ pageIcon.disabled }
  >
    {pageIcon.icon}
  </IconButton> : null;
};
PageIconButton.propTypes = {
  pageIcon: PropTypes.object,
  handleTouchJump: PropTypes.func,
  styles: PropTypes.object,
};

export { GPTextField, GPSelectField, PageIconButton };
