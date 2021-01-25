import React, { FunctionComponent, useState } from 'react';
import { TextField } from '@material-ui/core';
import { CONFIG } from 'types/ServerConfig';

interface TextInputData {
  value: string;
  primaryValue?: string;
  onChange(event);
  //setError(err: boolean);
}

export const PasswordInput: FunctionComponent<TextInputData> = ({
  value,
  onChange,
  primaryValue = undefined,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const handleOnBlur = e => {
    e.preventDefault();
    let err = false;
    if (primaryValue && primaryValue !== value) {
      err = true;
      return;
    }

    if (value.length < CONFIG.password.minLenght) {
      err = true;
      return;
    } else if (CONFIG.password.upperCase && !value.match('[A-Z]')) {
      err = true;
      return;
    } else if (CONFIG.password.lowerCase && !value.match('[a-z]')) {
      err = true;
      return;
    } else if (CONFIG.password.digit && !value.match('[1-9]')) {
      err = true;
      return;
    }

    setIsError(err);
  };

  return (
    <TextField
      fullWidth
      error={isError}
      label={primaryValue != undefined ? 'Confirm password' : 'Password'}
      variant="outlined"
      type="password"
      required
      onBlur={handleOnBlur}
      value={value}
      onChange={onChange}
      helperText={isError ? '6 symbols (1 digit, 1 upper and lower case)' : ''}
    />
  );
};
