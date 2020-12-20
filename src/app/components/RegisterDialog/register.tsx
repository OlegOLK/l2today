import React, { FunctionComponent, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  Fade,
} from '@material-ui/core';
import { PasswordInput } from './passwordInput';
import { EmaildInput } from './emailInput';
import CloseIcon from '@material-ui/icons/Close';
import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { userFromSaga } from './saga';
import { selectIsAuthenticated } from './selectors';

interface RegisterDialogProps {
  open: boolean;
  close();
}

type dialogTypes = 'reset' | 'register' | 'login';

const getDialogActions = (dialogType: dialogTypes, changeDialog: any) => {
  switch (dialogType) {
    case 'login': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button fullWidth onClick={e => changeDialog(e, 'reset')}>
              Forgot password?
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Button fullWidth onClick={e => changeDialog(e, 'register')}>
              Don't have an account yet? Register
            </Button>
          </Grid>
        </React.Fragment>
      );
    }
    case 'register': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button fullWidth onClick={e => changeDialog(e, 'reset')}>
              Forgot password?
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Button fullWidth onClick={e => changeDialog(e, 'login')}>
              Already have an account? <strong>Login</strong>
            </Button>
          </Grid>
        </React.Fragment>
      );
    }
    case 'reset': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button fullWidth onClick={e => changeDialog(e, 'register')}>
              Don't have an account yet? Register
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Button fullWidth onClick={e => changeDialog(e, 'login')}>
              Already have an account? <strong>Login</strong>
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
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <FormControlLabel
              control={<Checkbox name="checkedC" />}
              label="I agree with the Privacy Policy"
            />
          </Grid>
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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const email = useSelector(selectEmail);
  const googleResponse = response => {
    dispatch(
      actions.loginGoogle({ accessToken: response.getAuthResponse().id_token }),
    );
  };

  const [grow, setGrow] = React.useState(true);
  const [dialogType, setDialogType] = React.useState<dialogTypes>('register');

  const useEffectOnAuthenticated = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [isAuthenticated]);
  };

  useEffectOnAuthenticated(() => {
    if (isAuthenticated) {
      close();
    }
  });

  const handleClose = () => {
    close();
  };

  const changeDialog = (e: Event, type: dialogTypes) => {
    e.preventDefault();
    setGrow(false);
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
              {dialogType}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              You can use your l2new account to add servers and participate in
              events
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
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  style={{ height: '56px', color: 'white' }}
                  onClick={handleDialogAction}
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

              {getDialogActions(dialogType, changeDialog)}
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
