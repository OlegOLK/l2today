import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';

enum Tristate {
  Error,
  Success,
  NotInitialized,
}

export const ServerPlatformAndTypeFormFields: FunctionComponent = () => {
  const [
    isPlatformAndTypeValidationError,
    setPlatformAndTypeValidationError,
  ] = useState<Tristate>(Tristate.NotInitialized);
  const [serverPlaftorm, setServerPlaftorm] = React.useState<string>('');
  const handlePlatformChange = event => {
    setServerPlaftorm(event.target.value);
    setPlatformAndTypeValidationError(
      event.target.value.length === 0 || servertype.length === 0
        ? Tristate.Error
        : Tristate.Success,
    );
  };

  const [servertype, setServertype] = React.useState<string>('');
  const handleTypeChange = event => {
    setServertype(event.target.value);
    setPlatformAndTypeValidationError(
      serverPlaftorm.length === 0 || event.target.value.length === 0
        ? Tristate.Error
        : Tristate.Success,
    );
  };
  return (
    <>
      <Grid item xs={6} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Server platform</FormLabel>
          <RadioGroup
            aria-label="server-platform"
            name="server-platform"
            value={serverPlaftorm}
            onChange={handlePlatformChange}
          >
            <FormControlLabel value="PTS" control={<Radio />} label="PTS" />
            <FormControlLabel value="JAVA" control={<Radio />} label="JAVA" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Server types</FormLabel>
          <RadioGroup
            aria-label="server-type"
            name="server-type"
            value={servertype}
            onChange={handleTypeChange}
          >
            <FormControlLabel
              value="Normal"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel
              value="Multiproff"
              control={<Radio />}
              label="Multiproff"
            />
            <FormControlLabel value="GvE" control={<Radio />} label="GvE" />
            <FormControlLabel
              value="Multicraft"
              control={<Radio />}
              label="Multicraft"
            />
            <FormControlLabel
              value="Custom"
              control={<Radio />}
              label="Custom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};
