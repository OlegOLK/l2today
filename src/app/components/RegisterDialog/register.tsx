import React, { FunctionComponent } from 'react';
import {
  Typography,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Fade,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from '../../containers/LoginPage/slice';
import { userFromSaga } from '../../containers/LoginPage/saga';
import {
  selectEmail,
  selectIsAuthenticated,
} from '../../containers/LoginPage/selectors';

interface RegisterDialogProps {
  open: boolean;
  close();
}

type dialogTypes = 'reset' | 'register' | 'login';
type dialogActions =
  | 'Forgot password?'
  | 'Already have an account? Login'
  | "Don't have an account yet? Register";

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

const getDialogContent = (dialogType: dialogTypes) => {
  switch (dialogType) {
    case 'register': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginBottom: '15px' }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
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
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </Grid>
        </React.Fragment>
      );
    }
    case 'reset': {
      return (
        <React.Fragment>
          <Grid item xs={12} style={{ marginBottom: '15px' }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
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
  const email = useSelector(selectEmail);

  const googleResponse = response => {
    console.log(response);
    dispatch(
      actions.login({ accessToken: response.getAuthResponse().id_token }),
    );
  };

  const logout = () => {};
  const [grow, setGrow] = React.useState(true);
  const [dialogType, setDialogType] = React.useState<dialogTypes>('register');

  const handleClickOpen = () => {
    close();
  };

  const handleClose = () => {
    close();
  };

  const changeDialog = (e: Event, type: dialogTypes) => {
    e.preventDefault();
    setGrow(false);
    setTimeout(e => hz(type), 150);
  };

  const hz = (type: dialogTypes) => {
    setDialogType(type);
    setGrow(true);
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
              {getDialogContent(dialogType)}
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  style={{ height: '56px', color: 'white' }}
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
