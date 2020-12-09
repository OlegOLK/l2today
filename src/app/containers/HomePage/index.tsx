import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { LeftPanel } from '../../components/Leftpanel/index';
import { RightPanel } from '../../components/Rightpanel/index';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <Grid container direction="row" justify="space-between" spacing={2}>
        <Hidden mdDown>
          <LeftPanel />
        </Hidden>
        <RightPanel />
      </Grid>
    </>
  );
}
