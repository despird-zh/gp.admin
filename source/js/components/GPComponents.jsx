import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

const GPTextField = ({ eventKey, onHandleChange, ...rest }) => {
  const handleFieldChange = onHandleChange && onHandleChange.bind(null, eventKey);
  return (
    <TextField
      onChange={ handleFieldChange }
      { ...rest }
    />
  );
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

const PageIconButton = ({ pageIcon, handleTouchJump, styles, ...rest }) => {
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

export { GPTextField, GPSelectField, PageIconButton };
