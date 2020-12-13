import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { LeftPanel } from '../../components/Leftpanel/index';
import { RightPanel } from '../../components/Rightpanel/index';

export function HomePage() {
  return (
    <Grid container direction="row" justify="space-between" spacing={2}>
      <Hidden mdDown>
        <LeftPanel />
      </Hidden>
      <RightPanel />
    </Grid>
  );
}
