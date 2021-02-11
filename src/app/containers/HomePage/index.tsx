import React from 'react';
import { Grid } from '@material-ui/core';
import { RightPanel } from '../../components/Rightpanel/index';

export function HomePage() {
  return (
    <Grid container direction="row" justify="space-between" spacing={2}>
      {/* <Hidden mdDown>
        <LeftPanel />
      </Hidden> */}
      <RightPanel />
      {/* <RightPanel /> */}
    </Grid>
  );
}
