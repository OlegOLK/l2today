import { Grid, Paper, Typography, Button } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { SimpleCard } from './ServerInfo';
import { ServerPremiumStats } from './ServerPremiumStats';
import { ServerViewCharts } from './ServerViewCharts';
import { useParams } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { serversFromSaga } from 'app/components/AddServerForm/saga';
import { sliceKey, reducer, actions } from 'app/components/AddServerForm/slice';
// import {} from 'app/components/AddServerForm/'
import { selectServers } from 'app/components/AddServerForm/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { UserServer } from 'types/Server';

interface RouteParams {
  serverId: string;
}

export const ServerRegion: FunctionComponent = () => {
  const { serverId } = useParams<RouteParams>();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: serversFromSaga });
  const servers = useSelector(selectServers);
  const dispatch = useDispatch();

  const handleUriChange = (newServer: UserServer) => {
    let copy = [...servers];
    const serverIndex = servers.findIndex(x => x.id === newServer.id);
    copy[serverIndex] = {
      ...copy[serverIndex],
      approved: false,
      chronicles: newServer.chronicles,
      uri: newServer.uri,
      openDate: newServer.openDate,
      platform: newServer.platform,
      rates: newServer.rates,
      type: newServer.type,
      questions: newServer.questions,
      isDirty: true,
    };

    dispatch(actions.setServersState(copy));
  };
  const getCurrentServer = () => {
    const server = servers.find(x => x.id === serverId);
    if (server !== null && server !== undefined) {
      return <SimpleCard server={server} handleDataChange={handleUriChange} />;
    } else {
      return null;
    }
  };

  const currentServer = () => {
    return servers.find(x => x.id === serverId);
  };

  const updateServer = () => {
    const serverIndex = servers.findIndex(x => x.id === serverId);
    if (serverIndex === -1) {
      return;
    }
    dispatch(actions.updateServerFromState(servers[serverIndex]));
  };

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
          <ServerPremiumStats server={currentServer()} />
        </Grid>
      </Grid>

      <Grid item md={12}>
        <Paper elevation={3}>
          {getCurrentServer()}
          <Grid
            item
            container
            style={{ padding: '10px' }}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button variant="contained" color="primary" onClick={updateServer}>
              Update
            </Button>
          </Grid>
        </Paper>
        {/* <SimpleCard server={server || EMPTY_SERVER} /> */}
      </Grid>
    </>
  );
};
