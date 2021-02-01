import React, { FunctionComponent, useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { sliceKey, reducer, actions } from './slice';
import { selectIsLoading, selectCreatedServerId } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { serversFromSaga } from './saga';
import { useHistory } from 'react-router-dom';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import * as dfn from 'date-fns';
import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  InputLabel,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Checkbox,
  FormGroup,
  FormHelperText,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { CHRONICLES } from '../../mocks/chronicles';
import { Rate } from 'types/Server';

type AddServerFormProps = {};

enum Tristate {
  Error,
  Success,
  NotInitialized,
}

export const AddServerForm: FunctionComponent<AddServerFormProps> = () => {
  const [isServerNameValidationError, setServerNameValidationError] = useState<
    Tristate
  >(Tristate.NotInitialized);
  const [serverName, setServerName] = useState<string>('');
  const [serverUri, setServerUri] = useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: serversFromSaga });
  const isLoading = useSelector(selectIsLoading);
  const newServerId = useSelector(selectCreatedServerId);

  const handleServerNameChange = event => {
    setServerName(event.target.value);
  };
  const handleServerUriChange = event => {
    setServerUri(event.target.value);
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

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

  const [
    isChronicleAndRatesValidationError,
    setChronicleAndRatesValidationError,
  ] = useState<Tristate>(Tristate.NotInitialized);
  const [chronicle, setChronicle] = useState<string>('');
  const handleChronicleChange = event => {
    setChronicle(event.target.value);
  };

  const onChroniclesAndRatesBlur = () => {
    if (chronicle.length === 0) {
      setChronicleAndRatesValidationError(Tristate.Error);
      return;
    }
    if (!rates.some(x => x.amount !== 0)) {
      setChronicleAndRatesValidationError(Tristate.Error);
      return;
    }
    setChronicleAndRatesValidationError(Tristate.Success);
  };

  const rr: Rate[] = [];
  rr.push({ amount: 0, type: 'XP' });
  rr.push({ amount: 0, type: 'SP' });
  rr.push({ amount: 0, type: 'DROP' });
  rr.push({ amount: 0, type: 'ADENA' });
  rr.push({ amount: 0, type: 'SPOIL' });

  const [rates, setRates] = useState<Rate[]>(rr);
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

  const [rulseAccepted, setRulesAccepted] = useState<boolean>(false);

  const handleAcceptRulesChange = event => {
    setRulesAccepted(event.target.checked);
  };

  const getSeverity = (state: Tristate) => {
    return state === Tristate.Error
      ? 'error'
      : state === Tristate.NotInitialized
      ? 'info'
      : 'success';
  };

  const canAddServer = () => {
    return (
      isServerNameValidationError === Tristate.Success &&
      rulseAccepted &&
      isChronicleAndRatesValidationError === Tristate.Success &&
      isPlatformAndTypeValidationError === Tristate.Success &&
      !isLoading
    );
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const [serverAddClick, setServerAddClick] = useState<boolean>(false);

  useEffect(() => {
    if (newServerId && !isLoading && serverAddClick) {
      setServerAddClick(false);
      history.push(`/dashboard/server/${newServerId}`);
    }
  }, [newServerId, isLoading, serverAddClick, history]);
  const handleAddServer = () => {
    dispatch(
      actions.createServer({
        Rates: rates,
        Chronicles: chronicle,
        Type: servertype,
        Platform: serverPlaftorm,
        Name: serverName,
        Uri: serverUri,
        OpenDate: dfn.format(selectedDate, 'MM/dd/yyyy'),
      }),
    );
    setServerAddClick(true);
  };

  return (
    <Grid container item justify="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <Alert
            variant="filled"
            severity={getSeverity(isServerNameValidationError)}
          >
            <AlertTitle>Server name</AlertTitle>
            Server name cannot be edited after having been inserted into the
            database, so please add it correctly. Don't add rates/chronicles in
            server name.
          </Alert>
          <Box m={1}>
            <TextField
              onBlur={() =>
                setServerNameValidationError(
                  serverName.length === 0 ? Tristate.Error : Tristate.Success,
                )
              }
              fullWidth
              id="server-name"
              error={isServerNameValidationError === Tristate.Error}
              value={serverName}
              onChange={handleServerNameChange}
              label="Server name"
              variant="outlined"
              style={{ marginBottom: '5px' }}
              required
            />

            <TextField
              onBlur={() =>
                setServerNameValidationError(
                  serverUri.length === 0 ? Tristate.Error : Tristate.Success,
                )
              }
              fullWidth
              id="server-uri"
              error={isServerNameValidationError === Tristate.Error}
              value={serverUri}
              onChange={handleServerUriChange}
              label="Server website"
              variant="outlined"
              style={{ marginBottom: '5px' }}
              required
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                margin="normal"
                id="server-open-date"
                label="Open date"
                format="dd-MM-yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>

          <Alert
            variant="filled"
            severity={getSeverity(isPlatformAndTypeValidationError)}
          >
            <AlertTitle>Server platform and type</AlertTitle>
            {isPlatformAndTypeValidationError === Tristate.Error
              ? 'Please set platform and type'
              : ''}
          </Alert>
          <Box m={1}>
            <Grid item container spacing={2}>
              <Grid item xs={6} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Server platform</FormLabel>
                  <RadioGroup
                    aria-label="server-platform"
                    name="server-platform"
                    value={serverPlaftorm}
                    onChange={handlePlatformChange}
                  >
                    <FormControlLabel
                      value="PTS"
                      control={<Radio />}
                      label="PTS"
                    />
                    <FormControlLabel
                      value="JAVA"
                      control={<Radio />}
                      label="JAVA"
                    />
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
                    <FormControlLabel
                      value="GvE"
                      control={<Radio />}
                      label="GvE"
                    />
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
          </Box>

          <Alert
            variant="filled"
            severity={getSeverity(isChronicleAndRatesValidationError)}
          >
            <AlertTitle>Server chronicle and rates</AlertTitle>
            {isChronicleAndRatesValidationError === Tristate.Error
              ? 'Please set chronicles and rates'
              : ''}
          </Alert>

          <Box m={1}>
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

          <Alert variant="filled" severity="info">
            <AlertTitle>Server IP & ports</AlertTitle>
          </Alert>
          <Box m={1} pb={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  //onBlur={() => setServerNameValidationError(serverName.length === 0 ? Tristate.Error : Tristate.Success)}
                  type="number"
                  fullWidth
                  id="server-login-ip"
                  //error={isServerNameValidationError === Tristate.Error}
                  //value={serverName}
                  //onChange={handleServerNameChange}
                  label="Login server IP"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  //onBlur={() => setServerNameValidationError(serverName.length === 0 ? Tristate.Error : Tristate.Success)}
                  type="number"
                  fullWidth
                  id="server-login-port"
                  //error={isServerNameValidationError === Tristate.Error}
                  //value={serverName}
                  //onChange={handleServerNameChange}
                  label="Login server PORT"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  //onBlur={() => setServerNameValidationError(serverName.length === 0 ? Tristate.Error : Tristate.Success)}
                  type="number"
                  fullWidth
                  id="server-login-ip"
                  //error={isServerNameValidationError === Tristate.Error}
                  //value={serverName}
                  //onChange={handleServerNameChange}
                  label="Game server IP"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  //onBlur={() => setServerNameValidationError(serverName.length === 0 ? Tristate.Error : Tristate.Success)}
                  type="number"
                  fullWidth
                  id="server-game-port"
                  //error={isServerNameValidationError === Tristate.Error}
                  //value={serverName}
                  //onChange={handleServerNameChange}
                  label="Game server PORT"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box m={3}>
          <h1>Rules for adding new server!</h1>

          <Typography>
            If you do not read these rules, your server will be disabled. If you
            log in our website using proxy or dedicated servers, your server
            will be disabled.
          </Typography>
          <Typography>
            If you are not the server admin, DO NOT add the server!
          </Typography>

          <Typography>1. Server must be Online to get approval.</Typography>
          <Typography>
            2. Multiple accounts are forbidden. Do not add the same server twice
            to the same account or different accounts.
          </Typography>
          <Typography>
            3. Server must be FREE public server. You may choose any
            registration method, but the players must be allowed to play for
            free.
          </Typography>
          <Typography>
            4. No illegal or crap info is allowed in the listing form.
          </Typography>
          <Typography>5. No links to files are allowed.</Typography>
          <Typography>
            6. You must add your server info and date correctly.
          </Typography>
          <Typography>
            7.Server name cannot be edited after having been inserted into the
            database, so please add it correctly. Don't add rates/chronicles in
            server name.. Server name must reflect your domain name. Adding
            other info to server name will disabled you server.
          </Typography>
          <Typography>
            8. You must have a functional website / forum for users to contact
            you.. - Website must not be a free service like wcoz,wix and other
            type of free web services or facebook pages, links to files. We are
            not accepting this kind of servers. - Do not use redirects to other
            website. This may cause your server being disabled.
          </Typography>
          <Typography>
            9. Main condition for approval on l2new.com is our vote code. This
            code must be added on your website in a visible location.. TEST MODE
            will be added for servers that not adding our vote code in a visible
            zone this include bottom of the website. Visible zone mean, that
            users when open your website, must see our vote code for any type of
            screen size. REMOVAL of the l2new vote code will remove your site
            from the list.
          </Typography>
          <Typography>
            10.You are required to keep the submitted server listing information
            up to date, this includes removal of your server if you close it.
          </Typography>
          <Typography>11. Removal rules:</Typography>
          <Typography>
            - Server must be over 70 percent up-time after 3 days (except coming
            soon server);
          </Typography>
          <Typography>
            - The server will be deleted if it proves to be offline for 3 days
            (except coming soon server);
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          style={{
            justifyItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FormControl
            required
            error={true}
            component="fieldset"
            style={{ minWidth: '100px' }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rulseAccepted}
                    onChange={handleAcceptRulesChange}
                    name="accept"
                  />
                }
                label="Accept rules"
              />
            </FormGroup>
            {!rulseAccepted ? (
              <FormHelperText>
                To add server you need to accept rules & fill server info.
              </FormHelperText>
            ) : (
              ''
            )}

            {isLoading ? (
              <Grid item xs={12} container alignItems="center" justify="center">
                <CircularProgress />
              </Grid>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              disabled={!canAddServer()}
              onClick={handleAddServer}
            >
              Add server
            </Button>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};
