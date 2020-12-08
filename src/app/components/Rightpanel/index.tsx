import React, { FunctionComponent, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ServerList } from '../ServerList/index';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { serversListFormSaga } from './saga';
import { selectServersData, selectLoading } from './selectors';
import { useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
type RightPanelProps = {};
type RouteParams = {
  filterType: string;
  filterValue: string;
};

export const RightPanel: FunctionComponent<RightPanelProps> = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: serversListFormSaga });
  const servers = useSelector(selectServersData);
  let isLoading = useSelector(selectLoading);
  let { filterType, filterValue } = useParams<RouteParams>();

  const dispatch = useDispatch();
  const useEffectOnRouteChange = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [filterValue]);
  };

  useEffectOnRouteChange(() => {
    let value = filterValue;
    dispatch(actions.changeServerFilters(`${filterType}=${value}`));
    dispatch(actions.loadServers());
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadServers());
  });

  const any = () => {
    let a = servers.filter(x => x.servers.length > 0);
    return a.length > 0;
  };
  const soon = () => {
    return servers.filter(
      server => server.panel === 0 && server.servers.length !== 0,
    );
  };

  const already = () => {
    return servers.filter(
      server => server.panel === 1 && server.servers.length !== 0,
    );
  };

  return (
    <Grid container alignItems="flex-start" item lg={10} xl={10} spacing={2}>
      {isLoading ? (
        <>
          <Grid container item lg={6} xl={6} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
            </Grid>
          </Grid>
          <Grid container item lg={6} xl={6} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
            </Grid>
          </Grid>
        </>
      ) : !any() ? (
        <Grid container item lg={12} xl={12} spacing={2} justify="center">
          <Typography align="center" display="block" variant="h2">
            4
            <span role="img" aria-label="Crying Face">
              😢
            </span>
            4
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid
            item
            container
            alignItems="flex-start"
            lg={6}
            xl={6}
            spacing={2}
          >
            {soon().map(server => {
              return (
                <Grid
                  key={'grid' + server.sortOrder}
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <ServerList
                    key={'serverlist' + server.sortOrder}
                    groupped={server}
                  />
                </Grid>
              );
            })}
          </Grid>

          <Grid
            item
            container
            alignItems="flex-start"
            lg={6}
            xl={6}
            spacing={2}
          >
            {already().map(server => {
              return (
                <Grid
                  key={'grid' + server.sortOrder}
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <ServerList
                    key={'serverlist' + server.sortOrder}
                    groupped={server}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
};

{
  /* {isLoading ? (
        <>
          <Grid container item lg={6} xl={6} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
            </Grid>
          </Grid>
          <Grid container item lg={6} xl={6} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
              <Skeleton width="100%" variant="text" height={50} />
              <Skeleton width="100%" height="50%" variant="rect" />
            </Grid>
          </Grid>
        </>
      ) : !any() ? (
        <Grid container item lg={12} xl={12} spacing={2} justify="center">
          <Typography align="center" display="block" variant="h2">
            4
            <span role="img" aria-label="Crying Face">
              😢
            </span>
            4
          </Typography>
        </Grid>
      ) : (
        <> */
}

{
  /* </>
      )} */
}
