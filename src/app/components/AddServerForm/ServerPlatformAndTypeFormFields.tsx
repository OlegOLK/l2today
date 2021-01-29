import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import React, { FunctionComponent, useState } from 'react';
import { UserServer } from 'types/Server';

enum Tristate {
  Error,
  Success,
  NotInitialized,
}

interface Props {
  server: UserServer;
  handleDataChange(server: UserServer): void;
}

export const ServerPlatformAndTypeFormFields: FunctionComponent<Props> = ({
  server,
  handleDataChange,
}) => {
  const [
    isPlatformAndTypeValidationError,
    setPlatformAndTypeValidationError,
  ] = useState<Tristate>(Tristate.NotInitialized);
  // const [serverPlaftorm, setServerPlaftorm] = React.useState<string>(
  //   server.platform || '',
  // );
  const handlePlatformChange = (event, value) => {
    handleDataChange({ ...server, platform: value });
    // setServerPlaftorm(value);
    setPlatformAndTypeValidationError(
      event.target.value.length === 0 || server.type.length === 0
        ? Tristate.Error
        : Tristate.Success,
    );
  };

  // const [servertype, setServertype] = React.useState<string>(server.type || '');
  const handleTypeChange = event => {
    handleDataChange({ ...server, type: event.target.value });
    // setServertype(event.target.value);
    setPlatformAndTypeValidationError(
      server.platform.length === 0 || event.target.value.length === 0
        ? Tristate.Error
        : Tristate.Success,
    );
  };
  return (
    <Grid container>
      {isPlatformAndTypeValidationError
        ? // <Grid item xs={12} md={12}>
          //   <Alert severity="error"></Alert>
          // </Grid>
          null
        : null}
      <Grid item xs={6} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Server platform</FormLabel>
          <RadioGroup
            aria-label="server-platform"
            name="server-platform"
            value={server.platform}
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
            value={server.type}
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
    </Grid>
  );
};
