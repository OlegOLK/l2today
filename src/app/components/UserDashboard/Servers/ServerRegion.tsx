import { Grid, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { SimpleCard } from './ServerInfo';
import { ServerPremiumStats } from './ServerPremiumStats';
import { ServerViewCharts } from './ServerViewCharts';
import { useParams } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { serversFromSaga } from 'app/components/AddServerForm/saga';
import { sliceKey, reducer } from 'app/components/AddServerForm/slice';
import { selectServerById } from 'app/components/AddServerForm/selectors';
import { useSelector } from 'react-redux';
import { UserServer } from 'types/Server';

interface RouteParams {
  serverId: string;
}

export const ServerRegion: FunctionComponent = () => {
  const { serverId } = useParams<RouteParams>();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: serversFromSaga });
  const server = useSelector(selectServerById(serverId));

  return (
    <>
      <Grid item md={4}>
        <Paper
          elevation={3}
          style={{
            height: '75px',
            padding: '16px',
            backgroundColor: '#F4D03F',
            backgroundImage:
              'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)',
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography
                style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}
              >
                Server View
              </Typography>
              <Typography
                style={{ fontSize: '14px', fontWeight: 400, color: 'gray' }}
              >
                Total server views
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}
              >
                2380
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item md={4}>
        <Paper
          elevation={3}
          style={{
            height: '75px',
            padding: '16px',
            backgroundColor: '#D9AFD9',
            backgroundImage: 'linear-gradient(90deg, #8BC6EC 0%, #9599E2 100%)',
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography
                style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}
              >
                Server View
              </Typography>
              <Typography
                style={{ fontSize: '14px', fontWeight: 400, color: 'gray' }}
              >
                Today server views
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}
              >
                +231
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item md={4}>
        <Paper
          elevation={3}
          style={{
            height: '75px',
            padding: '16px',
            backgroundColor: '#FBAB7E',
            backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography
                style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}
              >
                Server quiz starts
              </Typography>
              <Typography
                style={{ fontSize: '14px', fontWeight: 400, color: 'gray' }}
              >
                All time quiz starts
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}
              >
                480
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid
        item
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item md={8}>
          <ServerViewCharts />
        </Grid>
        <Grid item md={4}>
          <ServerPremiumStats />
        </Grid>
      </Grid>

      <Grid item md={12}>
        <SimpleCard server={server || EMPTY_SERVER} />
      </Grid>
    </>
  );
};

const EMPTY_SERVER: UserServer = {
  chronicles: '',
  id: '',
  name: '',
  openDate: '',
  platform: '',
  type: '',
  rates: [],
  uri: '',
  premium: 0,
  approved: false,
};
