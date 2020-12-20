//^(.+)@(\S+)$
import React, { FunctionComponent, useState } from 'react';
import { TextField } from '@material-ui/core';

interface TextInputData {
  value: string;
  onChange(event);
  //setError(err: boolean);
}

export const EmaildInput: FunctionComponent<TextInputData> = ({
  value,
  onChange,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const handleOnBlur = e => {
    e.preventDefault();
    const err = !value.match('^(.+)@(\\S+)$');
    setIsError(err);
  };

  return (
    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      required
      onBlur={handleOnBlur}
      value={value}
      onChange={onChange}
      error={isError}
      helperText={isError ? 'invalid email format' : ''}
    />
  );
};
