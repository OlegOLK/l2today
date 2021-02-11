import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { Donate } from 'app/components/UserDashboard/Donate/Donate';
export const AdvertisementPage: FunctionComponent = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Donate />

      {/* <Grid container item md={8} sm={12}>
      </Grid> */}
    </Grid>
  );
};
