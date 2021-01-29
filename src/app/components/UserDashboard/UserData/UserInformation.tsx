import React, { FunctionComponent } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userFromSaga } from 'app/components/RegisterDialog/saga';
import { sliceKey, reducer } from 'app/components/RegisterDialog/slice';
import { selectUser } from 'app/components/RegisterDialog/selectors';
import { useSelector } from 'react-redux';
import { Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';

export const UserInformation: FunctionComponent = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const user = useSelector(selectUser);
  return (
    // <Paper elevation={3}>
    //   <Container maxWidth="lg">
    //     <Grid container>
    <Grid item md={12}>
      <Paper elevation={3} style={{ height: '40em' }}>
        <Typography style={{ textAlign: 'center' }}>
          Актуальная информация об аккаунте
        </Typography>
        <Divider style={{ margin: '20px' }} />
        <Grid item container justify="space-around" spacing={3}>
          <Grid item md={5}>
            <TextField
              disabled
              fullWidth
              color="primary"
              value={user.name}
              variant="outlined"
              label={'user name'}
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              disabled
              fullWidth
              color="primary"
              value={user.email}
              variant="outlined"
              label={'user email'}
            />
          </Grid>

          <Grid item md={5}>
            <TextField
              disabled
              fullWidth
              color="primary"
              value={'0 CREDITS'}
              variant="outlined"
              label={'user balance'}
            />
          </Grid>

          <Grid item md={5}>
            <TextField
              disabled
              fullWidth
              color="primary"
              value={'0 quiz points'}
              variant="outlined"
              label={'user quiz points'}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
