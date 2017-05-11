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
  children: PropTypes.any,
  onHandleChange: PropTypes.func,
};

/**
 * The page button to be displayed in page header
 */
const PageIconButton = ({ pageIcon, handleTouchJump, style }) => {
  const handTouchTap = () => {
    handleTouchJump(pageIcon);
  };
  return <IconButton
    key={ pageIcon.path }
    onTouchTap={ handTouchTap }
    iconStyle={ style }
    disabled={ pageIcon.disabled }
  >
    {pageIcon.icon}
  </IconButton>;
};
PageIconButton.propTypes = {
  pageIcon: PropTypes.object,
  handleTouchJump: PropTypes.func,
  styles: PropTypes.object,
};

export { GPTextField, GPSelectField, PageIconButton };
