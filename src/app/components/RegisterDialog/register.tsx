import React, { FunctionComponent, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { PasswordInput } from './passwordInput';
import { EmaildInput } from './emailInput';
import CloseIcon from '@material-ui/icons/Close';
import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { userFromSaga } from './saga';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} from './selectors';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RegisterDialogProps {
  open: boolean;
  close();
}

type dialogTypes = 'reset' | 'register' | 'login';

const getDialogActions = (
  dialogType: dialogTypes,
  changeDialog: any,
  t: any,
) => {
  switch (dialogType) {
    case 'login': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={e => changeDialog(e, 'reset')}
            >
              {t('registerDialog.actions.forgot')}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={e => changeDialog(e, 'register')}
            >
              {t('registerDialog.actions.register')}
            </Button>
          </Grid>
        </React.Fragment>
      );
    }
    case 'register': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={e => changeDialog(e, 'reset')}
            >
              {t('registerDialog.actions.forgot')}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={e => changeDialog(e, 'login')}
            >
              {t('registerDialog.actions.login')}
            </Button>
          </Grid>
        </React.Fragment>
      );
    }
    case 'reset': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={e => changeDialog(e, 'register')}
            >
              {t('registerDialog.actions.register')}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={e => changeDialog(e, 'login')}
            >
              {t('registerDialog.actions.login')}
            </Button>
          </Grid>
        </React.Fragment>
      );
    }
  }
};

interface TextInputData {
  value: any;
  onChange(event);
}

const getDialogContent = (
  dialogType: dialogTypes,
  email: TextInputData,
  password: TextInputData,
  confirmPassword: TextInputData,
) => {
  switch (dialogType) {
    case 'register': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginBottom: '15px' }}>
            <EmaildInput value={email.value} onChange={email.onChange} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <PasswordInput
              onChange={password.onChange}
              value={password.value}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <PasswordInput
              onChange={confirmPassword.onChange}
              value={confirmPassword.value}
              primaryValue={password.value}
            />
          </Grid>
          {/* <Grid item xs={12} style={{ marginTop: '20px' }}>
            <FormControlLabel
              control={<Checkbox name="checkedC" />}
              label="I agree with the Privacy Policy"
            />
          </Grid> */}
        </React.Fragment>
      );
    }
    case 'login': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginBottom: '15px' }}>
            <EmaildInput value={email.value} onChange={email.onChange} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <PasswordInput
              onChange={password.onChange}
              value={password.value}
            />
          </Grid>
        </React.Fragment>
      );
    }
    case 'reset': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginBottom: '15px' }}>
            <EmaildInput value={email.value} onChange={email.onChange} />
          </Grid>
        </React.Fragment>
      );
    }
    default:
      return '';
  }
};

export const RegisterDialog: FunctionComponent<RegisterDialogProps> = ({
  open,
  close,
}) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const serverErrors = useSelector(selectError);
  // const history = useHistory();
  const googleResponse = response => {
    dispatch(
      actions.loginGoogle({ accessToken: response.getAuthResponse().id_token }),
    );
  };

  const [grow, setGrow] = React.useState(true);
  const [dialogType, setDialogType] = React.useState<dialogTypes>('login');

  const useEffectOnAuthenticated = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [isAuthenticated]);
  };

  useEffectOnAuthenticated(() => {
    if (isAuthenticated && open) {
      close();
      // history.push('/dashboard');
    }
  });

  const handleClose = () => {
    close();
  };

  const changeDialog = (e: Event, type: dialogTypes) => {
    e.preventDefault();
    setGrow(false);
    dispatch(actions.prune());
    setTimeout(() => hz(type), 150);
  };

  const hz = (type: dialogTypes) => {
    setDialogType(type);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setGrow(true);
  };

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const handleEmailChange = event => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };

  const handlePasswordChange = event => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleDialogAction = event => {
    event.preventDefault();
    switch (dialogType) {
      case 'login': {
        dispatch(actions.login({ email: email, password: password }));
        return;
      }
      case 'register': {
        dispatch(actions.register({ email: email, password: password }));
        return;
      }
      default:
        return;
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <Fade in={grow}>
        <div>
          <DialogTitle disableTypography={true}>
            <Box
              component="div"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              variant="h3"
              style={{
                fontWeight: 700,
                fontSize: '32px',
                textTransform: 'uppercase',
              }}
              gutterBottom
            >
              {t(`registerDialog.dialogHeader.${dialogType}`)}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {t('registerDialog.dialogSubheader')}
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container>
              {getDialogContent(
                dialogType,
                { value: email, onChange: handleEmailChange },
                { value: password, onChange: handlePasswordChange },
                {
                  value: confirmPassword,
                  onChange: handleConfirmPasswordChange,
                },
              )}
              {isLoading ? (
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="center"
                  justify="center"
                >
                  <CircularProgress />
                </Grid>
              ) : serverErrors.length !== 0 ? (
                serverErrors.map(err => {
                  return (
                    <Grid item xs={12} style={{ marginBottom: '5px' }}>
                      <Alert variant="filled" severity="error">
                        {err}
                      </Alert>
                    </Grid>
                  );
                })
              ) : null}

              <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  style={{ height: '56px', color: 'white' }}
                  onClick={handleDialogAction}
                  disabled={isLoading}
                >
                  {dialogType}
                </Button>
              </Grid>
              {dialogType === 'login' ? (
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: '20px', marginBottom: '5px' }}
                >
                  <GoogleLogin
                    clientId="519365439057-oi91pp77935c4pam7uka6a2qqs7k401j.apps.googleusercontent.com"
                    buttonText="GOOGLE"
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                  />
                </Grid>
              ) : null}

              {getDialogActions(dialogType, changeDialog, t)}
            </Grid>
          </DialogContent>
        </div>
      </Fade>
    </Dialog>
  );
};

/*

backgroundColor: 'rgb(31, 177, 65)',

*/
