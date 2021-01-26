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
import { Rate, UserServer } from 'types/Server';
import { CHRONICLES } from '../../mocks/chronicles';

enum Tristate {
  Error,
  Success,
  NotInitialized,
}

interface Props {
  server: UserServer;
}

export const ServerRatesFormFields: FunctionComponent<Props> = ({ server }) => {
  const rr: Rate[] = [];
  rr.push({ amount: 0, type: 'XP' });
  rr.push({ amount: 0, type: 'SP' });
  rr.push({ amount: 0, type: 'DROP' });
  rr.push({ amount: 0, type: 'ADENA' });
  rr.push({ amount: 0, type: 'SPOIL' });
  const [chronicle, setChronicle] = useState<string>(server.chronicles || '');
  const handleChronicleChange = event => {
    setChronicle(event.target.value);
  };

  const [rates, setRates] = useState<Rate[]>(server.rates || rr);
  const handleRateChange = (event, index: number) => {
    const val = Number.parseInt(event.target.value);
    if (val <= 0) {
      return;
    }

    let tempRates = [...rates];
    let rate = { ...rates[index] };
    if (!rate) {
      return;
    }
    rate.amount = val;
    tempRates[index] = rate;
    setRates(tempRates);
  };

  const [, setChronicleAndRatesValidationError] = useState<Tristate>(
    Tristate.NotInitialized,
  );

  const onChroniclesAndRatesBlur = () => {
    if (!rates.some(x => x.amount !== 0)) {
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
            value={chronicle}
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
          {rates.map((rt, i) => {
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
