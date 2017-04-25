import React from 'react';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

const TextFieldExampleCustomize = () => (
  <div>
    <div style={ { display: 'flex' } }>
      <TextField
        floatingLabelText='Styled Floating Label Text'
        floatingLabelFixed={ true }
        hintText='Styled Hint Text'
        hintStyle={ styles.errorStyle }
      />
      <TextField
        floatingLabelText='Styled Floating Label Text'
        floatingLabelFixed={ true }
        hintText='Custom error color'
        errorText='This field is required.'
        errorStyle={ styles.errorStyle }
      />
    </div>
    <div style={ { display: 'flex' } }>
      <TextField
        floatingLabelText='Styled Floating Label Text'
        hintText='Custom Underline Color'
        underlineStyle={ styles.underlineStyle }
      />
      <TextField
        floatingLabelText='Styled Floating Label Text'
        hintText='Custom Underline Focus Color'
        underlineFocusStyle={ styles.underlineStyle }
      />
    </div>
    <div style={ { display: 'flex' } }>
      <TextField
        floatingLabelText='Styled Floating Label Text'
        floatingLabelStyle={ styles.floatingLabelStyle }
        floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
      />
    </div>
  </div>
);

export default TextFieldExampleCustomize;
