import { Typography, Grid, Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export const Donate: FunctionComponent = () => {
  return (
    <Grid item md={12}>
      <Paper elevation={3} style={{ height: '40em' }}>
        {/* <Container maxWidth="lg"> */}
        <Typography style={{ textAlign: 'center' }} variant="h4">
          To buy premium at this momen you need to contact admin in the discrod
        </Typography>
        <Typography style={{ textAlign: 'center' }} variant="h5">
          Prices for all types of premium is under discussion
        </Typography>
        {/* </Container> */}
      </Paper>
    </Grid>
  );
};
