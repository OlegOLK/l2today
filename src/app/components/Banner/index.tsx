import { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { SampleCard } from './sample';
import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer } from '../Rightpanel/slice';
import { serversListFormSaga } from '../Rightpanel/saga';
import { selectServersData } from '../Rightpanel/selectors';

const useStyles = makeStyles(() => ({
  header: {
    top: 0,
  },
}));

type BannerProps = {};

export const Banner: FunctionComponent<BannerProps> = () => {
  const classes = useStyles();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: serversListFormSaga });

  let isLoading = useSelector(selectServersData);

  return (
    <header>
      <Box textAlign="center" my={2} className={classes.header}>
        <Grid container justify="space-around" alignItems="center" spacing={0}>
          <Grid item>
            <SampleCard a11yIndex={0} isLoading={isLoading.length === 0} />
          </Grid>

          <Grid item>
            <SampleCard a11yIndex={1} isLoading={isLoading.length === 0} />
          </Grid>

          <Grid item>
            <SampleCard a11yIndex={2} isLoading={isLoading.length === 0} />
          </Grid>

          <Grid item>
            <SampleCard a11yIndex={3} isLoading={isLoading.length === 0} />
          </Grid>
          <Grid item>
            <SampleCard a11yIndex={4} isLoading={isLoading.length === 0} />
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};
