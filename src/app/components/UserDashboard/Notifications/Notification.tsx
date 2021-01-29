import { Grid, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export const Notification: FunctionComponent = () => {
  return (
    <Grid item md={12}>
      <Paper elevation={3} style={{ height: '40em' }}>
        <Typography style={{ textAlign: 'center' }} variant="h4">
          All notifications will be displayed here. Stay tuned!
        </Typography>
      </Paper>
    </Grid>
  );
};
