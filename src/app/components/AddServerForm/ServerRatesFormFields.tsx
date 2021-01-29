import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { UserServer } from 'types/Server';
import { CHRONICLES } from '../../mocks/chronicles';

enum Tristate {
  Error,
  Success,
  NotInitialized,
}

interface Props {
  server: UserServer;
  handleDataChange(server: UserServer): void;
}

export const ServerRatesFormFields: FunctionComponent<Props> = ({
  server,
  handleDataChange,
}) => {
  const handleChronicleChange = event => {
    handleDataChange({ ...server, chronicles: event.target.value });
  };

  const handleRateChange = (event, index: number) => {
    const val = Number.parseInt(event.target.value);
    if (val <= 0) {
      return;
    }
    let tempRates = [...server.rates];
    let rate = { ...server.rates[index] };
    if (!rate) {
      return;
    }
    rate.amount = val;
    tempRates[index] = rate;
    handleDataChange({ ...server, rates: tempRates });
  };

  const [, setChronicleAndRatesValidationError] = useState<Tristate>(
    Tristate.NotInitialized,
  );

  const onChroniclesAndRatesBlur = () => {
    if (!server.rates.some(x => x.amount !== 0)) {
      setChronicleAndRatesValidationError(Tristate.Error);
      return;
    }
    setChronicleAndRatesValidationError(Tristate.Success);
  };

  return (
    <Grid container direction="row">
      <Box m={1}>
        {/* <Alert
          severity={getSeverity(isChronicleAndRatesValidationError)}
        ></Alert> */}
        <FormControl fullWidth variant="outlined">
          <InputLabel id="server-chronicle">Chronicle</InputLabel>
          <Select
            fullWidth
            onBlur={onChroniclesAndRatesBlur}
            labelId="server-chronicle"
            id="server-chronicle-select"
            value={server.chronicles}
            onChange={handleChronicleChange}
            label="Chronicle"
          >
            {CHRONICLES.map((ch, i) => {
              return (
                <MenuItem key={i + ch} value={ch}>
                  {ch}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Grid item container spacing={2} style={{ marginTop: '5px' }}>
          {server.rates.map((rt, i) => {
            return (
              <Grid key={'grid' + rt.type} item xs={12} md={6}>
                <TextField
                  id={rt.type}
                  key={rt.type}
                  fullWidth
                  value={rt.amount}
                  onBlur={onChroniclesAndRatesBlur}
                  onChange={e => handleRateChange(e, i)}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {rt.type}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};
