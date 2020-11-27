import { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { SampleCard } from './sample';

const useStyles = makeStyles(() => ({
  header: {
    top: 0,
  },
}));

type BannerProps = {};

export const Banner: FunctionComponent<BannerProps> = () => {
  const classes = useStyles();

  return (
    <header>
      <Box textAlign="center" my={2} className={classes.header}>
        <Grid container justify="space-around" alignItems="center" spacing={3}>
          <Grid item>
            <SampleCard />
          </Grid>

          <Grid item>
            <SampleCard />
          </Grid>

          <Grid item>
            <SampleCard />
          </Grid>

          <Grid item>
            <SampleCard />
          </Grid>
          <Grid item>
            <SampleCard />
          </Grid>
          <Grid item>
            <SampleCard />
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};
